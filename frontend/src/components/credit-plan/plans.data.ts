export type PlanOption = {
  id: string;
  amount: string;
  note: string;
  recommended?: boolean;
};

export const planOptions: PlanOption[] = [
  { id: 'p100', amount: 'S/ 100', note: 'A tu ritmo' },
  { id: 'p150', amount: 'S/ 150', note: 'Recomendado para ti', recommended: true },
  { id: 'p200', amount: 'S/ 200', note: 'Más rápido' },
];

export type PlanSummaryRow = {
  id: string;
  label: string;
  value: string;
};

export const planSummary: PlanSummaryRow[] = [
  { id: 'cuotas', label: 'Cantidad de cuotas', value: '6' },
  { id: 'monto', label: 'Monto de práctica', value: 'S/ 900' },
  { id: 'fecha', label: 'Fecha de pago', value: 'Cada día 5' },
  { id: 'intereses', label: 'Intereses', value: 'S/ 0.00' },
];
