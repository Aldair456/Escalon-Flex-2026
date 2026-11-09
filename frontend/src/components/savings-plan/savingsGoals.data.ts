import { Ionicons } from '@expo/vector-icons';

export type SavingsGoalOption = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const savingsGoalOptions: SavingsGoalOption[] = [
  { id: 'colchon', label: 'Colchón de emergencia', icon: 'shield-checkmark-outline' },
  { id: 'meta-personal', label: 'Una meta personal', icon: 'gift-outline' },
  { id: 'preparar-credito', label: 'Prepararme para un crédito', icon: 'trending-up-outline' },
  { id: 'no-se', label: 'Aún no sé', icon: 'help-circle-outline' },
];
