export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
};

export const transactions: Transaction[] = [
  { id: '1', title: 'Recarga a Juan Pérez', subtitle: '09 Jun. 2022 - 2:35 pm - Claro', amount: -5 },
  { id: '2', title: 'Transferencia de María López', subtitle: '09 Jun. 2022 - 2:23 pm', amount: 5 },
  { id: '3', title: 'Recarga a Pedro Ramírez', subtitle: '09 Jun. 2022 - 1:36 pm - Claro', amount: -5 },
  { id: '4', title: 'Transferencia de Ana Torres', subtitle: '09 Jun. 2022 - 1:35 pm', amount: 5 },
  { id: '5', title: 'Pago a Copias Junior', subtitle: '06 Jun. 2022 - 6:48 pm - Copias de Junio', amount: -10 },
];
