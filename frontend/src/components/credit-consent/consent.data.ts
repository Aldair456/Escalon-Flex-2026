export type DataUsageItem = {
  id: string;
  title: string;
  description: string;
  defaultOn: boolean;
};

export const dataUsageItems: DataUsageItem[] = [
  {
    id: 'movimientos',
    title: 'Mis movimientos en Yape',
    description: 'Cuánto recibes y cada cuánto',
    defaultOn: true,
  },
  {
    id: 'saldo',
    title: 'Mi saldo promedio',
    description: 'Cuánto mantienes en tu Yape',
    defaultOn: true,
  },
  {
    id: 'pagos',
    title: 'Mis pagos de servicios',
    description: 'Recargas, planes y suscripciones',
    defaultOn: true,
  },
  {
    id: 'tarjeta',
    title: 'Mi tarjeta BCP',
    description: 'Movimientos y consumos, si tienes una vinculada a Yape',
    defaultOn: true,
  },
];

export type VisibilityItem = {
  id: string;
  title: string;
  description: string;
  defaultOn: boolean;
  locked?: boolean;
};

export const visibilityItems: VisibilityItem[] = [
  { id: 'bcp', title: 'BCP', description: 'Necesario para el reto', defaultOn: true, locked: true },
  { id: 'credicorp', title: 'Empresas Credicorp', description: 'Opcional · Mibanco, Pacífico', defaultOn: false },
];
