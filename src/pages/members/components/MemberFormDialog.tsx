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
import type { MemberFormDialog, MemberFormValues, Role } from '@/interfaces';
import { ROLES } from '@/interfaces';
import { useForm } from 'react-hook-form';



export function MemberFormDialog({
    open,
    onOpenChange, 
    onSubmit,
    isPending,
}: MemberFormDialog) {

    const {
        register,
        handleSubmit, 
        reset,
    } = useForm<MemberFormValues>({
        defaultValues: {
                email: '',
                name: '',
                role: 'MEMBER' as Role,
                authId: ''
        },
    });

    const handleFormSubmit = async ( values: MemberFormValues ) => {
        await onSubmit(values);
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Nuevo Miembro
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label> 
                            Nombre
                        </Label>
                        <Input
                            placeholder="Juan Pérez"
                            {...register('name', {
                                required: true,
                            })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Rol
                        </Label>
                        <Select
                            {...register('role', {
                                required: true,
                            })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLES.map((role) => (
                                    <SelectItem
                                        key={role}
                                        value={role}
                                    >
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label> Email </Label>
                        <Input
                            type="email"
                            placeholder="usuario@email.com"
                            {...register('email', {
                                required: true,
                            })}
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        > Cancelar </Button>
                        <Button 
                            type="submit"
                            disabled={isPending}
                        >
                            Guardar gasto
                        </Button>
                    </div> 
                     
                </form>
               
            </DialogContent>

        </Dialog>
    );
}