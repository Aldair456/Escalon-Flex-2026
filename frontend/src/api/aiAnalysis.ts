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
        'Eres un asistente financiero de Yape (Perú) que analiza el comportamiento de ahorro de un usuario para decidir si construyó un buen perfil financiero. Responde siempre en español, en un tono cercano y motivador, nunca alarmista. No es una aprobación de crédito real: cuando hables de elegibilidad, describe una "revisión de constancia por parte del BCP, sin garantía", nunca una "reevaluación crediticia" ni una aprobación.',
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

/**
 * Análisis calculado localmente cuando la IA no responde (sin créditos, sin red, etc.).
 * Usa la misma data real del usuario, con reglas por rangos de score/constancia.
 */
export function getFallbackAnalysis(progress: SavingsProgress): FinancialAnalysis {
  const completionPercent =
    progress.totalAportes > 0 ? Math.round((progress.paidCount / progress.totalAportes) * 100) : 0;

  if (progress.paidCount === 0) {
    return {
      isPositive: true,
      summary: '¡Apenas estás comenzando! 🚀',
      whatYoureDoingWell: `Ya creaste tu plan de ahorro con una meta de S/ ${progress.goalAmount}. Ese primer paso ya cuenta para construir tu historial.`,
      recommendation: `Haz tu primer aporte de S/ ${progress.aporteAmount} para empezar a sumar a tu perfil financiero.`,
      microcreditEligible: false,
      microcreditText: 'Todavía no tienes historial suficiente. En cuanto empieces a pagar tus cuotas, podrás ser evaluado.',
    };
  }

  if (progress.score >= 750 && progress.missedCount === 0) {
    return {
      isPositive: true,
      summary: '¡Tu comportamiento financiero es positivo! 🎉',
      whatYoureDoingWell: `Mantienes una alta constancia en tus aportes (${completionPercent}% completados) y cumples tus metas de ahorro sin atrasos.`,
      recommendation: 'Continúa con tus aportes y, si puedes, aumenta ligeramente tu meta para seguir fortaleciendo tu perfil.',
      microcreditEligible: true,
      microcreditText: 'Con tu comportamiento actual, podrías ser elegible para una revisión de tu constancia por parte del BCP, sin garantía.',
    };
  }

  if (progress.score >= 450) {
    return {
      isPositive: true,
      summary: '¡Vas por buen camino! 💪',
      whatYoureDoingWell: `Llevas ${progress.paidCount} de ${progress.totalAportes} aportes pagados (${completionPercent}%) y S/ ${progress.paidAmount} ahorrados, mostrando compromiso con tu meta.`,
      recommendation:
        progress.missedCount > 0
          ? `Tienes ${progress.missedCount} cuota(s) sin pagar. Ponte al día y mantén tus próximos aportes a tiempo para fortalecer tu historial más rápido.`
          : 'Sigue así y, si puedes, intenta no reprogramar tus próximos aportes para subir aún más tu nivel.',
      microcreditEligible: false,
      microcreditText: 'Aún te falta un poco de constancia para que el BCP revise tu perfil, sin garantía, pero vas en buen camino.',
    };
  }

  return {
    isPositive: false,
    summary: 'Tu comportamiento financiero necesita un empujón 💡',
    whatYoureDoingWell: `Ya lograste ahorrar S/ ${progress.paidAmount} hasta ahora, lo cual es un buen punto de partida.`,
    recommendation: `Procura ponerte al día con tus cuotas pendientes (${progress.missedCount} sin pagar) y mantener tus próximos aportes a tiempo para mejorar tu score.`,
    microcreditEligible: false,
    microcreditText: 'Por ahora no calificas para que el BCP revise tu perfil, pero mejorando tu constancia puedes lograrlo pronto.',
  };
}
