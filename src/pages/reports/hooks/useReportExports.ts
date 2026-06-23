import { useMutation } from '@tanstack/react-query';
import { reportsService } from '@/services/reportsService';

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
}

export function useExportPdf() {
  return useMutation({
    mutationFn: async ({ year, month }: { year: number; month: number }) => {
      const response = await reportsService.exportPdf(year, month);

      downloadBlob(
        response.data,
        `reporte-${year}-${month}.pdf`
      );
    },
  });
}

export function useExportExcel() {
  return useMutation({
    mutationFn: async ({ year, month }: { year: number; month: number }) => {
      const response = await reportsService.exportExcel(year, month);

      downloadBlob(
        response.data,
        `reporte-${year}-${month}.xlsx`
      );
    },
  });
}