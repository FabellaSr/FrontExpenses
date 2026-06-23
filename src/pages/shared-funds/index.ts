export interface SharedFund {
  id: number;
  year: number;
  month: number;
  targetAmount: string;
  createdAt: string;
}

export interface SharedFundBreakdownMember {
  userId: string;
  userName: string;
  salary: number;
  percentage: number;
  expectedContribution: number;
}
export interface SalaryBreakdownItem {
  id: number;   
  userId: string;
  name: string;
  salary: number;
  percentage: number;
  contribution: number;
}
export interface SharedFundBreakdown {
  year: number;
  month: number;
  targetAmount: number;
  totalSalaries: number;
  breakdown: SalaryBreakdownItem[];
}

export interface SharedProps {
  year: number;
  month: number;
}

export interface SalaryEntry {
    userId: string;
    salary: number;
}
export interface SalaryUpdateEntry {
  id: number;       // id numérico de la entidad
  salary: number;
}
