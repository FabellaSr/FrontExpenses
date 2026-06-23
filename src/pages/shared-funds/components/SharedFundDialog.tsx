import { useEffect } from 'react';
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
import { useCreateSharedFund } from '../hooks/useCreateSharedFund';
import { useUpdateSharedFund } from '../hooks/useUpdateSharedFund'; 
 
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  year: number;
  month: number;
  // Si se pasa fundId + targetAmount, el dialog edita en lugar de crear
  fundId?: number;
  currentTargetAmount?: number;
}
 
interface FormValues {
  targetAmount: number;
}
 
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
 
export function SharedFundDialog({
  open,
  onOpenChange,
  year,
  month,
  fundId,
  currentTargetAmount,
}: Props) {
  const isEditing = fundId !== undefined;
 
  const createMutation = useCreateSharedFund(year, month);
  const updateMutation = useUpdateSharedFund(year, month);

 
  const isPending = createMutation.isPending || updateMutation.isPending;
 
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { targetAmount: currentTargetAmount ?? 0 },
  });
 
  // Sincronizar el valor cuando se abre en modo edición
  useEffect(() => {
    if (open) {
      reset({ targetAmount: currentTargetAmount ?? 0 });
    }
  }, [open, currentTargetAmount, reset]);
 
  const onSubmit = async (values: FormValues) => {
    if (isEditing) {
      await updateMutation.mutateAsync({ id: fundId, targetAmount: values.targetAmount });
    } else {
      await createMutation.mutateAsync(values.targetAmount);
    }
    reset();
    onOpenChange(false);
  };
 
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar' : 'Nuevo'} fondo — {MONTH_NAMES[month - 1]} {year}
          </DialogTitle>
        </DialogHeader>
 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Monto total a dividir</Label>
            <Input
              type="number"
              placeholder="Ej: 800000"
              {...register('targetAmount', {
                required: true,
                min: 1,
                valueAsNumber: true,
              })}
            />
            <p className="text-xs text-muted-foreground">
              Este monto se va a repartir entre los miembros según sus salarios.
            </p>
          </div>
 
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}