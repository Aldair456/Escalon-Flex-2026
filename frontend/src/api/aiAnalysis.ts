import { z } from 'zod';

import type { SavingsProgress } from '@/state/savingsPlan';

const AnalysisSchema = z.object({
  isPositive: z.boolean(),
  summary: z.string(),
  whatYoureDoingWell: z.string(),
  recommendation: z.string(),
  microcreditEligible: z.boolean(),
  microcreditText: z.string(),
});

export type FinancialAnalysis = z.infer<typeof AnalysisSchema>;

const ANALYSIS_JSON_SCHEMA = {
  type: 'object',
  properties: {
    isPositive: { type: 'boolean' },
    summary: { type: 'string' },
    whatYoureDoingWell: { type: 'string' },
    recommendation: { type: 'string' },
    microcreditEligible: { type: 'boolean' },
    microcreditText: { type: 'string' },
  },
  required: [
    'isPositive',
    'summary',
    'whatYoureDoingWell',
    'recommendation',
    'microcreditEligible',
    'microcreditText',
  ],
  additionalProperties: false,
} as const;

export async function getFinancialAnalysis(progress: SavingsProgress): Promise<FinancialAnalysis> {
  const onTimeRatio = progress.totalAportes > 0 ? progress.onTimeCount / progress.totalAportes : 0;
  const completionRatio = progress.totalAportes > 0 ? progress.paidCount / progress.totalAportes : 0;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_API_KEY ?? '',
      'anthropic-version': '2026-10-21',
    },
    body: JSON.stringify({
      model: 'claude-opus-5-5',
      max_tokens: 1024,
      system:
        'Eres un asistente financiero de Yape (Perú) que analiza el comportamiento de ahorro de un usuario para decidir si construyó un buen historial. Responde siempre en español, en un tono cercano y motivador, nunca alarmista. No es una aprobación de crédito real, solo un análisis orientativo.',
      messages: [
        {
          role: 'user',
          content: `Analiza este comportamiento de ahorro y devuelve el resultado en el formato pedido:
- Meta de ahorro: S/ ${progress.goalAmount}
- Monto ahorrado hasta ahora: S/ ${progress.paidAmount}
- Aportes pagados: ${progress.paidCount} de ${progress.totalAportes}
- Aportes pagados a tiempo (sin reprogramar): ${progress.onTimeCount}
- Aportes no pagados: ${progress.missedCount}
- Aportes reprogramados: ${progress.rescheduledCount}
- % de cumplimiento: ${Math.round(completionRatio * 100)}%
- % de puntualidad: ${Math.round(onTimeRatio * 100)}%
- Score interno: ${progress.score} de 1000
- Nivel actual: ${progress.levelLabel}`,
        },
      ],
      output_config: {
        format: { type: 'json_schema', schema: ANALYSIS_JSON_SCHEMA },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find((block: { type: string }) => block.type === 'text');

  if (!textBlock) {
    throw new Error('La respuesta de la IA no incluyó texto');
  }

  return AnalysisSchema.parse(JSON.parse(textBlock.text));
}
