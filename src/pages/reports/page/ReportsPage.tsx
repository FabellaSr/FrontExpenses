import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReportsByDate } from '../hooks/useReportsByDate';
import { useExportExcel, useExportPdf } from '../hooks/useReportExports';
 
interface ReportCategory {
  categoryId: string;
  categoryName: string;
  total: number;
  pct: number;
}

interface ReportData {
  byCategory: ReportCategory[];
}

interface ReportsHook {
  data?: ReportData;
  loading: boolean;
}

export default function ReportsPage() {
  const now = new Date();
  const { data: reportData } = useReportsByDate(
    now.getFullYear(),
    now.getMonth() + 1
  ) as ReportsHook;
  const exportPdf = useExportPdf();
  const exportExcel = useExportExcel();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Reportes</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportPdf.mutate({ year: now.getFullYear(), month: now.getMonth() + 1 })}>
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={() => exportExcel.mutate({ year: now.getFullYear(), month: now.getMonth() + 1 })}>
            Exportar Excel
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Resumen mensual</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr><th>Categoría</th><th className="text-right">Total</th><th className="text-right">%</th></tr>
            </thead>
            <tbody>
              {reportData?.byCategory.map((c: ReportCategory) => (
                <tr key={c.categoryId} className="border-t">
                  <td className="py-2">{c.categoryName}</td>
                  <td className="text-right">${c.total.toLocaleString()}</td>
                  <td className="text-right">{c.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
