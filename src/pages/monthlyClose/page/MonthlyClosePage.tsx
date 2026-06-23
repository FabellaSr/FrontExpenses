import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMonthlyCloseActions } from '../hooks/useAdminMonthly';


export default function MonthlyClosePage() {
  const { close, open } = useMonthlyCloseActions();

  const month = 5;
  const year = 2025;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cierre mensual</h1>

      <Card>
        <CardHeader>
          <CardTitle>Mayo 2025</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            El cierre bloquea el alta de gastos para el mes seleccionado.
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                open.mutate({ month, year })
              }
              disabled={open.isPending}
            >
              Abrir mes
            </Button>

            <Button
              variant="destructive"
              onClick={() =>
                close.mutate({ month, year })
              }
              disabled={close.isPending}
            >
              Cerrar mes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}