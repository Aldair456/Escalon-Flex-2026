export type PlanOption = {
  id: string;
  amount: string;
  frequency: string;
  note: string;
  recommended?: boolean;
};

export const planOptions: PlanOption[] = [
  { id: 'p35', amount: 'S/ 35', frequency: 'mensual', note: 'A tu ritmo' },
  {
    id: 'p50',
    amount: 'S/ 50',
    frequency: 'cada 15 días',
    note: 'Recomendado para ti',
    recommended: true,
  },
  { id: 'p65', amount: 'S/ 65', frequency: 'mensual', note: 'Más rápido' },
];

export type PlanSummaryRow = {
  id: string;
  label: string;
  value: string;
};

export const planSummary: PlanSummaryRow[] = [
  { id: 'cuotas', label: 'Cantidad de aportes', value: '6' },
  { id: 'monto', label: 'Monto que vas a ahorrar', value: 'S/ 300' },
  { id: 'fecha', label: 'Fecha de aporte', value: 'Cada día 5' },
  { id: 'intereses', label: 'Costo adicional', value: 'S/ 0.00' },
];
