import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/theme/colors';

export type NotificationEntry = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
};

export const notifications: NotificationEntry[] = [
  {
    id: 'reminder',
    icon: 'notifications',
    iconColor: colors.primary,
    iconBackground: '#F3EEFA',
    title: 'Recuerda pagar tu cuota',
    description: 'Tu cuota de S/ 50 vence mañana, 05 de enero.',
    timestamp: '2h',
    unread: true,
  },
  {
    id: 'payment-method',
    icon: 'warning',
    iconColor: '#B45309',
    iconBackground: '#FEF3C7',
    title: 'Tu método de pago cambió',
    description: 'Actualizamos la cuenta desde la que se descuenta tu cuota.',
    timestamp: '1d',
    unread: true,
  },
  {
    id: 'paid',
    icon: 'checkmark-circle',
    iconColor: colors.accent,
    iconBackground: '#D1FAE5',
    title: '¡Pagaste a tiempo!',
    description: 'Tu cuota 3 de 6 quedó registrada.',
    timestamp: '3d',
    unread: false,
  },
  {
    id: 'level-up',
    icon: 'bar-chart',
    iconColor: colors.primary,
    iconBackground: '#F3EEFA',
    title: 'Subiste de nivel',
    description: 'Ahora estás en Sólido.',
    timestamp: '1 semana',
    unread: false,
  },
];
