import { reportsService } from '@/services/reportsService';
import type { ReportSummary } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';

export function useReportsByDate(year: number, month: number) {
  const query = useQuery<ReportSummary>({
    queryKey: ["reports", year, month],
    queryFn: () => reportsService.monthly(year, month),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  return { data: query.data, loading: query.isLoading };
}