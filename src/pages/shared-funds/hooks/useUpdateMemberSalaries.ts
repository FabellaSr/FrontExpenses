import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberSalariesService } from '@/services/memberSalariesService';
import { SalaryEntry } from '..';


export function useUpdateMemberSalaries(year: number, month: number) {

    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, salary }: SalaryEntry) =>
            memberSalariesService.update(userId, { salary }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['shared-fund-current', year, month] });
            qc.invalidateQueries({ queryKey: ['shared-fund-breakdown', year, month] });
        },
    });
}