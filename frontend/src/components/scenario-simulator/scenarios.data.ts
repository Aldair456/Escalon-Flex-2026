export type ScenarioOption = {
  id: string;
  label: string;
  incomeDrop: number;
};

export const scenarioOptions: ScenarioOption[] = [
  { id: 'actual', label: 'Ingreso actual', incomeDrop: 0 },
  { id: 'drop15', label: '15% menos', incomeDrop: 0.15 },
  { id: 'drop30', label: '30% menos', incomeDrop: 0.3 },
  { id: 'drop50', label: '50% menos', incomeDrop: 0.5 },
];

export const BASE_MONTHLY_INCOME = 1500;
export const FIXED_EXPENSES = 900;
export const CURRENT_INSTALLMENT = 129.3;
export const MIN_INCOME_DROP = 0;
export const MAX_INCOME_DROP = 0.7;
