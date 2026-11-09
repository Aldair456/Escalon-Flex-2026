export type FrequencyOption = {
  id: string;
  label: string;
  days: number;
};

export const frequencyOptions: FrequencyOption[] = [
  { id: 'semanal', label: 'Semanal', days: 7 },
  { id: 'quincenal', label: 'Quincenal', days: 15 },
  { id: 'mensual', label: 'Mensual', days: 30 },
];
