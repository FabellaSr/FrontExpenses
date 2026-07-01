export type Role = "ADMIN" | "MEMBER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface MonthlyClose {
  id: string;
  year: number;
  month: number;
  closed: boolean;
  closedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}


export interface ReportDebt {
  from: string;
  to: string;
  amount: number;
}

export interface ReportSummary {
  totalAmount: number;
  byCategory: ReportCategory[];
  byMember: ReportMember[];
  debts: ReportDebt[];
  recent: Expense[];
}

export interface ReportCategory{
    categoryId: string;
    categoryName: string;
    total: number;
    pct: number;
}

 export interface ReportMember {
  userId: string;
  userName: string;
  total: number;
}

export const ROLES: Role[] = ["ADMIN", "MEMBER"];
/*Members*/
export interface Member extends User {
  authId: string;
}
export interface MemberFormDialog {
  open: boolean;
  isPending?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (memberLike: Partial<Member>) => Promise<void>;
}
export interface MemberFormProps {
  title: string;
  subTitle: string;
  member: Member;
  isPending: boolean;
  // Methods
  onOpenChange: (open: boolean) => void;
  onSubmit: (memberLike: Partial<Member>) => Promise<void>;
}
export interface MembersFormDialog {
  open: boolean;
  isPending?: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (memberLike: Partial<Member>) => Promise<void>;
}
export interface MemberFormValues {
  email: string;
  name: string;
  role: Role;
  authId: string;
}
export interface MemberSalary {
  id: number;
  userId: string;
  user: Pick<User, 'id' | 'name'>;
  year: number;
  month: number;
  salary: number;
}
/*Expenses*/
export interface UseExpensesParams {
  month?: number;
  year?: number;
}
export interface ExpensesFormDialog {
  open: boolean;
  categories: Category[];
  isPending?: boolean;

  onSubmit: (expenseLike: Partial<Expense>) => Promise<void>;
  onOpenChange: (open: boolean) => void;

   initialValues?: Partial<ExpenseFormValues>; 

}
export interface Expense {
  id: string;
  date: string;
  categoryId: string;
  category?: Category;
  concept: string;
  amount: number;
  userId: string;
  user?: Pick<User, "id" | "name">;
  receiptUrl?: string;
}
export interface ExpenseFormValues {
  date: string;
  categoryId: string;
  concept: string;
  amount: number;
}
/*Salary*/

export interface SalaryBreakdownItem {
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

export interface SharedFund {
  id: number;
  year: number;
  month: number;
  targetAmount: number;
  createdAt: string;
}

export interface Organization{
  id:number;
  organization: string;
  status: boolean;
}
// export interface ExpensesFormDialog {
//     open: boolean;
//     expense: Expense;
//     onOpenChange: (open: boolean) => void;
//     categories: Category[];
//     onCreated: () => Promise<void>;

// }
