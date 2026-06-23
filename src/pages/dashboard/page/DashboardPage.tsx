import { useReportsByDate } from '@/pages/reports/hooks/useReportsByDate';
import { SummaryCard } from '../components/SummaryCard';
import { CategoryChart } from '../components/CategoryChart';
import { MembersChart } from '../components/MembersChart';
import { BalancesCard } from '../components/BalancesCard'; 
import { SharedFundCard } from '../../shared-funds/page/SharedFundCardPage';
 


export default function DashboardPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: report, loading } = useReportsByDate(year, month);

  const debts = report?.debts ?? [];

  if (loading || !report) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total del mes"
          value={`$${report.totalAmount.toLocaleString()}`}
        />

        <SummaryCard
          title="Miembros activos"
          value={report.byMember.length}
        />

        <SummaryCard
          title="Movimientos"
          value={report.recent.length}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <CategoryChart data={report.byCategory} />
        <MembersChart data={report.byMember} />
        <BalancesCard debts={debts} />
        <SharedFundCard year={year} month={month} />
      </div>
    </div>
  );
}