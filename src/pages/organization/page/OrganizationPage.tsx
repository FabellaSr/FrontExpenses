import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { EmptyState } from '@/components/shared/EmptyState';
import { useOrganizations } from '../hooks/useOrganizations';
import { useCreateOrganization } from '../hooks/useCreateOrganization';
import { useUpdateOrganization } from '../hooks/useUpdateOrganizations';

export default function OrganizationsPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const { data: organizations, error } = useOrganizations();
  const createOrganization = useCreateOrganization();
  const updateOrganization = useUpdateOrganization();

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      await createOrganization.mutateAsync(trimmed);
      toast.success('Organización creada correctamente');
      setName('');
      setOpen(false);
    } catch {
      toast.error('Error al crear la organización');
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await updateOrganization.mutateAsync({ id, data: { status: !currentStatus } });
      toast.success(`Organización ${currentStatus ? 'desactivada' : 'activada'}`);
    } catch {
      toast.error('Error al actualizar el estado');
    }
  };

  if (error) {
    return <p className="p-6 text-red-500">Error al cargar las organizaciones.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Organizaciones</h1>
        <Button onClick={() => setOpen(true)}>Nueva organización</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
        </CardHeader>
        <CardContent>
          {organizations.length === 0 ? (
            <EmptyState
              title="Sin organizaciones"
              description="Creá la primera organización."
            />
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2">Nombre</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id} className="border-t">
                    <td className="py-2">{org.organization}</td>
                    <td>
                      <Badge variant={org.status ? 'default' : 'secondary'}>
                        {org.status ? 'Activa' : 'Inactiva'}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={updateOrganization.isPending}
                        onClick={() => handleToggleStatus(org.id, org.status)}
                      >
                        {org.status ? 'Desactivar' : 'Activar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Dialog nueva organización */}
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setName(''); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Nueva organización</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                placeholder="Ej: Familia García"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setOpen(false); setName(''); }}>
                Cancelar
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!name.trim() || createOrganization.isPending}
              >
                Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}