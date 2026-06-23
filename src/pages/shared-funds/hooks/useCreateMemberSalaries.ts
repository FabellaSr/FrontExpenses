import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberSalariesService } from '@/services/memberSalariesService';
import { SalaryEntry } from '..';

export function useCreateMemberSalaries(year: number, month: number) {
  const qc = useQueryClient();

  return useMutation({
    // Envía un POST por cada miembro con salario cargado
    mutationFn: (entries: SalaryEntry[]) =>
      Promise.all(
        entries.map((e) =>
          memberSalariesService.create({ userId: e.userId, year, month, salary: e.salary })
        )
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shared-fund-breakdown', year, month] });
    },
  });
}
