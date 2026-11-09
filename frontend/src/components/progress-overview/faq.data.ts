export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export const faqEntries: FaqEntry[] = [
  {
    id: 'que-es',
    question: '¿Qué es Construye crédito?',
    answer:
      'Es un reto para que practiques pagos puntuales y empieces a generar historial, aunque nunca hayas tenido una tarjeta o préstamo.',
  },
  {
    id: 'dinero',
    question: '¿Mi dinero es mío? ¿Puedo retirarlo?',
    answer:
      'Es un préstamo que te da BCP, no tu propio dinero. Queda bloqueado mientras pagas tus cuotas y se libera completo al terminar.',
    defaultOpen: true,
  },
  {
    id: 'historial',
    question: '¿Cómo se construye un historial crediticio?',
    answer:
      'Pagando tus cuotas a tiempo. Como es un préstamo real, cada pago puntual se reporta y construye tu historial crediticio formal.',
  },
  {
    id: 'sbs',
    question: '¿Esto aparece en la SBS?',
    answer: 'Sí. Es un préstamo real de BCP, así que tus pagos puntuales sí generan historial crediticio formal.',
  },
  {
    id: 'atraso',
    question: '¿Qué pasa si me atraso?',
    answer:
      'Tienes 15 días de gracia sin penalidad. Si pasas los 30 días de atraso, eso sí se reporta a la SBS, igual que con cualquier préstamo real.',
  },
  {
    id: 'termino',
    question: '¿Qué pasa cuando termino?',
    answer:
      'El banco libera tu monto bloqueado y ya tienes historial crediticio real para postular a tu primer producto de crédito.',
  },
];
