import { Ionicons } from '@expo/vector-icons';

export type CreditGoalOption = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const creditGoalOptions: CreditGoalOption[] = [
  { id: 'tarjeta', label: 'Mi primera tarjeta', icon: 'card-outline' },
  { id: 'prestamo', label: 'Un préstamo', icon: 'cash-outline' },
  { id: 'negocio', label: 'Emprender un negocio', icon: 'briefcase-outline' },
  { id: 'no-se', label: 'Aún no sé', icon: 'help-circle-outline' },
];

export type CreditUsageOption = {
  id: string;
  label: string;
};

export const creditUsageOptions: CreditUsageOption[] = [
  { id: 'estudios', label: 'Estudios' },
  { id: 'laptop', label: 'Laptop o equipo' },
  { id: 'negocio', label: 'Mi negocio' },
  { id: 'emergencias', label: 'Emergencias' },
  { id: 'otro', label: 'Otro' },
];
