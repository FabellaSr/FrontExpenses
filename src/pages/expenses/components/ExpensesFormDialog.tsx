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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import type { ExpenseFormValues, ExpensesFormDialog } from '@/interfaces';
import { useEffect } from 'react';


export function ExpenseFormDialog({
    open,
    onOpenChange,
    categories,
    onSubmit,
    isPending,
    initialValues,
}: ExpensesFormDialog) {
    const today = new Date().toISOString().split('T')[0];
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
    } = useForm<ExpenseFormValues>({
        defaultValues: initialValues ?? {
            date: today,
            categoryId: '',
            concept: '',
            amount: 0,
        },
    });
    const categoryId = watch('categoryId');

    const handleFormSubmit = async ( values: ExpenseFormValues ) => {
        await onSubmit(values);
        reset({
            date: new Date().toISOString().split('T')[0],
            categoryId: '',
            concept: '',
            amount: 0,
        });
        onOpenChange(false);
    };
    useEffect(() => {
        if (initialValues) reset(initialValues);
    }, [initialValues, reset]);
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                      <DialogTitle>{initialValues ? 'Editar gasto' : 'Nuevo gasto'}</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-6 py-4">
                        
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            {...register('date', {
                                required: true,
                            })}/>
                    </div>

                    <div className="space-y-2">
                        <Label>Categoría</Label>

                        <Select
                            value={categoryId}
                            onValueChange={(value) =>
                                setValue('categoryId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem
                                        key={c.id}
                                        value={c.id}
                                    >
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Concepto</Label>

                        <Input
                            placeholder="Ej: Compra materiales"
                            {...register('concept', {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Monto</Label>

                        <Input
                            type="number"
                            placeholder="0.00"
                            {...register('amount', {
                                required: true,
                                min: 1,
                                valueAsNumber: true,
                            })}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}>
                            Guardar gasto
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}