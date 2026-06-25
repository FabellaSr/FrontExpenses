import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMonthlyCloseActions } from '../hooks/useAdminMonthly';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export default function MonthlyClosePage() {
  const { close, open, activeMonth, activeYear, isClosed, isLoading } =
    useMonthlyCloseActions();

  const monthLabel = `${MONTH_NAMES[activeMonth - 1]} ${activeYear}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cierre mensual</h1>

      <Card>
        <CardHeader>
          <CardTitle>{isLoading ? '...' : monthLabel}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            El cierre bloquea el alta de gastos para el mes seleccionado.
          </p>

          {!isLoading && (
            <p className="text-sm font-medium">
              Estado:{' '}
              <span className={isClosed ? 'text-red-500' : 'text-green-500'}>
                {isClosed ? 'Cerrado' : 'Abierto'}
              </span>
            </p>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => open.mutate({ month: activeMonth, year: activeYear })}
              disabled={open.isPending || isLoading || !isClosed}
            >
              Abrir mes
            </Button>

            <Button
              variant="destructive"
              onClick={() => close.mutate({ month: activeMonth, year: activeYear })}
              disabled={close.isPending || isLoading || isClosed}
            >
              Cerrar mes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}