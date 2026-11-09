import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
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

const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getFinancialAnalysis(progress: SavingsProgress): Promise<FinancialAnalysis> {
  const onTimeRatio = progress.totalAportes > 0 ? progress.onTimeCount / progress.totalAportes : 0;
  const completionRatio = progress.totalAportes > 0 ? progress.paidCount / progress.totalAportes : 0;

  const response = await client.messages.parse({
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
      format: zodOutputFormat(AnalysisSchema),
    },
  });

  if (!response.parsed_output) {
    throw new Error('No se pudo interpretar la respuesta de la IA');
  }

  return response.parsed_output;
}
