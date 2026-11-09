export type AnalysisStep = {
  id: string;
  label: string;
  status: 'done' | 'pending';
};

export const analysisSteps: AnalysisStep[] = [
  { id: 'historial', label: 'Verificando tu historial de pagos', status: 'done' },
  { id: 'comportamiento', label: 'Revisando tu comportamiento en Yape', status: 'done' },
  { id: 'linea', label: 'Calculando tu línea disponible', status: 'pending' },
];
