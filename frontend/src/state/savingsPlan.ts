export type SavingsPlan = {
  goalAmount: number;
  targetDate: Date | null;
  datePresetId: string | null;
  frequencyId: string;
  customDays: string;
  aporteAmount: number;
  estimatedAportes: number;
  frequencyLabel: string;
  planDurationLabel: string;
  paidCount: number;
};

let currentPlan: SavingsPlan | null = null;

export function setSavingsPlan(plan: SavingsPlan) {
  currentPlan = plan;
}

export function getSavingsPlan(): SavingsPlan | null {
  return currentPlan;
}

/** Cuotas marcadas como no pagadas/atrasadas (demo de UI, no persiste entre planes nuevos). */
let missedInstallments: Set<number> = new Set();

function getCursor(plan: SavingsPlan): number {
  const total = Math.max(1, plan.estimatedAportes);
  return Math.min(total, Math.max(0, plan.paidCount) + missedInstallments.size);
}

/** Marca como pagado el siguiente aporte pendiente. Devuelve el nuevo total pagado. */
export function markNextInstallmentPaid(): number {
  const plan = currentPlan ?? DEFAULT_PLAN;
  const total = Math.max(1, plan.estimatedAportes);
  const paidCount = Math.min(total, Math.max(0, plan.paidCount) + 1);
  currentPlan = { ...plan, paidCount };
  return paidCount;
}

/** Marca el siguiente aporte pendiente como no pagado/atrasado, sin sumarlo a lo ahorrado. */
export function markNextInstallmentMissed(): void {
  const plan = currentPlan ?? DEFAULT_PLAN;
  const total = Math.max(1, plan.estimatedAportes);
  const cursor = getCursor(plan);
  if (cursor < total) {
    missedInstallments = new Set(missedInstallments).add(cursor + 1);
  }
}

/** Reprogramaciones manuales por número de cuota (demo de UI, no persiste entre planes nuevos). */
let rescheduledInstallments: Record<number, Date> = {};

export function rescheduleInstallment(number: number, date: Date) {
  rescheduledInstallments = { ...rescheduledInstallments, [number]: date };
}

export type InstallmentStatus = 'paid' | 'missed' | 'next' | 'pending';

export type SavingsInstallment = {
  id: string;
  number: number;
  date: string;
  status: InstallmentStatus;
  rescheduled: boolean;
};

export type SavingsProgress = {
  goalAmount: number;
  aporteAmount: number;
  totalAportes: number;
  paidCount: number;
  missedCount: number;
  rescheduledCount: number;
  onTimeCount: number;
  score: number;
  isConstant: boolean;
  paidAmount: number;
  remaining: number;
  frequencyLabel: string;
  levelLabel: string;
  levelIndex: number;
  installments: SavingsInstallment[];
  nextInstallment: SavingsInstallment | null;
};

const DEFAULT_PLAN: SavingsPlan = {
  goalAmount: 300,
  targetDate: null,
  datePresetId: null,
  frequencyId: 'mensual',
  customDays: '',
  aporteAmount: 50,
  estimatedAportes: 6,
  frequencyLabel: 'Mensual',
  planDurationLabel: '6 meses',
  paidCount: 0,
};

const FREQUENCY_DAYS: Record<string, number> = { semanal: 7, quincenal: 15, mensual: 30 };
const MONTH_ABBR = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function getFrequencyDays(plan: SavingsPlan) {
  if (plan.frequencyId === 'otro') {
    const parsed = Number(plan.customDays);
    return parsed > 0 ? parsed : 30;
  }
  return FREQUENCY_DAYS[plan.frequencyId] ?? 30;
}

function formatShortDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTH_ABBR[date.getMonth()];
  return `${day} ${month}. ${date.getFullYear()}`;
}

export function getSavingsProgress(): SavingsProgress {
  const plan = currentPlan ?? DEFAULT_PLAN;
  const frequencyDays = getFrequencyDays(plan);
  const total = Math.max(1, plan.estimatedAportes);
  const paidCount = Math.min(total, Math.max(0, plan.paidCount));
  const cursor = getCursor(plan);
  const paidAmount = paidCount * plan.aporteAmount;
  const remaining = total - paidCount;

  const today = new Date();
  const installments: SavingsInstallment[] = Array.from({ length: total }, (_, index) => {
    const number = index + 1;
    const computedDate = new Date(today);
    computedDate.setDate(computedDate.getDate() + (number - cursor) * frequencyDays);
    const override = rescheduledInstallments[number];
    const status: InstallmentStatus = missedInstallments.has(number)
      ? 'missed'
      : number <= cursor
        ? 'paid'
        : number === cursor + 1
          ? 'next'
          : 'pending';
    return {
      id: String(number),
      number,
      date: formatShortDate(override ?? computedDate),
      status,
      rescheduled: Boolean(override),
    };
  });

  const missedCount = missedInstallments.size;
  const rescheduledCount = Object.keys(rescheduledInstallments).length;
  const onTimeCount = Math.max(0, paidCount - rescheduledCount);
  const isConstant = paidCount > 0 && missedCount === 0;

  const completionRatio = paidCount / total;
  const punctualityRatio = missedCount === 0 ? 1 : Math.max(0, paidCount - missedCount) / total;
  const score = Math.round(500 * completionRatio + 500 * punctualityRatio);

  const levelLabel =
    cursor === 0 ? 'Recién comenzando' : paidCount >= total ? 'Reto completado' : 'En construcción';
  const levelIndex = cursor === 0 ? 1 : paidCount >= total ? 4 : missedCount > 0 ? 2 : 3;

  return {
    goalAmount: plan.goalAmount,
    aporteAmount: plan.aporteAmount,
    totalAportes: total,
    paidCount,
    missedCount,
    rescheduledCount,
    onTimeCount,
    score,
    isConstant,
    paidAmount,
    remaining,
    frequencyLabel: plan.frequencyLabel,
    levelLabel,
    levelIndex,
    installments,
    nextInstallment: installments.find((item) => item.status === 'next') ?? null,
  };
}
