import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMembers } from '@/pages/members/hooks/useMembers';
import { useCreateMemberSalaries } from '../hooks/useCreateMemberSalaries';
import { useUpdateMemberSalaries } from '../hooks/useUpdateMemberSalaries';
import { SalaryBreakdownItem } from '..';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  year: number;
  month: number;
  existingSalaries?: SalaryBreakdownItem[]; // ← nuevo: salarios actuales del breakdown
}

type FormValues = {
  salaries: Record<string, string>;
};

export function MemberSalaryDialog({
  open,
  onOpenChange,
  year,
  month,
  existingSalaries,
}: Props) {
  const { data: members, isLoading } = useMembers();
  const createMutation = useCreateMemberSalaries(year, month);
  const updateMutation = useUpdateMemberSalaries(year, month);

  // Pre-rellena con los salarios existentes si los hay
  const defaultSalaries = existingSalaries?.reduce<Record<string, string>>(
    (acc, item) => ({ ...acc, [item.userId]: String(item.salary) }),
    {}
  ) ?? {};

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { salaries: defaultSalaries },
  });

  const onSubmit = async (values: FormValues) => {
    const existingIds = new Set(existingSalaries?.map((s) => s.userId) ?? []);

    const toCreate = [];
    const toUpdate = [];

    for (const [userId, val] of Object.entries(values.salaries)) {
      if (val === '' || Number(val) <= 0) continue;
      const salary = Number(val);
      if (existingIds.has(userId)) {
        toUpdate.push({ userId, salary });
      } else {
        toCreate.push({ userId, salary });
      }
    }

    await Promise.all([
      toCreate.length ? createMutation.mutateAsync(toCreate) : Promise.resolve(),
      ...toUpdate.map((e) => updateMutation.mutateAsync(e)),
    ]);

    reset();
    onOpenChange(false);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Salarios de {month}/{year}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {isLoading && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded-md bg-muted" />
              ))}
            </div>
          )}

          {!isLoading && members.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay miembros cargados todavía.
            </p>
          )}

          {!isLoading && members.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {existingSalaries?.length
                  ? 'Editá los salarios de cada miembro.'
                  : 'Ingresá el salario de cada miembro. Podés dejar en blanco a quien no participe este mes.'}
              </p>
              {members.map((member) => (
                <div key={member.id} className="space-y-1">
                  <Label>{member.name}</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    {...register(`salaries.${member.id}`, { min: 0 })}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || isLoading}>
              {isPending ? 'Guardando...' : 'Guardar salarios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}