export type LoanTermOption = {
  id: string;
  months: number;
  label: string;
  baseInstallment: number;
  baseInterest: number;
  tea: string;
  tcea: string;
};

export const loanTermOptions: LoanTermOption[] = [
  { id: '1', months: 1, label: '1 mes', baseInstallment: 1060.70, baseInterest: 60.70, tea: '6.1%', tcea: '95.9%' },
  { id: '3', months: 3, label: '3 meses', baseInstallment: 422.03, baseInterest: 162.23, tea: '5.2%', tcea: '66.1%' },
  { id: '6', months: 6, label: '6 meses', baseInstallment: 233.63, baseInterest: 297.98, tea: '4.8%', tcea: '58.9%' },
];
