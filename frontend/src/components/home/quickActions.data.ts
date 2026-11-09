import type { ImageSourcePropType } from 'react-native';

export type QuickAction = {
  id: string;
  label: string;
  image: ImageSourcePropType;
  route?: string;
  badge?: string;
};

export const quickActions: QuickAction[] = [
  { id: 'recargar', label: 'Recargar celular', image: require('../../../assets/icons/quick-actions/recargar-celular.png') },
  { id: 'yapear-servicios', label: 'Yapear servicios', image: require('../../../assets/icons/quick-actions/yapear-servicios.png') },
  { id: 'promos', label: 'Promos', image: require('../../../assets/icons/quick-actions/promos.png') },
  { id: 'aprobar-compras', label: 'Aprobar compras', image: require('../../../assets/icons/quick-actions/aprobar-compras.png') },
  {
    id: 'creditos',
    label: 'Créditos',
    image: require('../../../assets/icons/quick-actions/creditos.png'),
    route: '/p0',
  },
  {
    id: 'construye-credito',
    label: 'Construye tu perfil',
    image: require('../../../assets/illustrations/credit-steps.png'),
    route: '/p7',
    badge: 'Nuevo',
  },
  { id: 'dolares', label: 'Dólares', image: require('../../../assets/icons/quick-actions/dolares.png') },
  { id: 'remesas', label: 'Remesas', image: require('../../../assets/icons/quick-actions/remesas.png') },
  { id: 'soat', label: 'SOAT', image: require('../../../assets/icons/quick-actions/soat.png') },
  {
    id: 'recargar-transporte',
    label: 'Recargar Transporte',
    image: require('../../../assets/icons/quick-actions/recargar-transporte.png'),
  },
  { id: 'siempre-listos', label: 'Siempre Listos', image: require('../../../assets/icons/quick-actions/siempre-listos.png') },
  { id: 'ver-todo', label: 'Ver todo', image: require('../../../assets/icons/quick-actions/ver-todo.png') },
];
