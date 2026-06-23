import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSharedFundCurrent } from '../hooks/useSharedFundCurrent';
import { useSharedFundBreakdown } from '../hooks/useSharedFundBreakdown';
import { SharedFundDialog } from '../components/SharedFundDialog';
import { MemberSalaryDialog } from '../components/MemberSalaryDialog'; 
import { ContributionBar } from '../components/ContributionBar';
import { SharedProps } from '..';


export function SharedFundCard({ year, month }: SharedProps) {
  const {
    data: fund,
    isLoading: loadingFund,
    isError: noFund,
  } = useSharedFundCurrent(year, month);

  const {
    data: breakdown,
    isLoading: loadingBreakdown,
    isError: noBreakdown,
  } = useSharedFundBreakdown(year, month);

  const [fundOpen, setFundOpen] = useState(false);
  const [salaryOpen, setSalaryOpen] = useState(false);

  const maxContribution = breakdown
    ? Math.max(...breakdown.breakdown.map((b) => b.contribution))
    : 1;

  const fundOk = (fund?.targetAmount ?? 0) > 0; 
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Aporte al fondo compartido</CardTitle>
        </CardHeader>

        <CardContent>
          
           {loadingFund && (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-1 animate-pulse">
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-2 w-full rounded bg-muted" />
                </div>
              ))}
            </div>
          )}

          {!noFund && !loadingFund && !fundOk && (
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm text-muted-foreground">
                No hay fondo cargado para este mes.
              </p>
              <Button variant="outline" size="sm" onClick={() => setFundOpen(true)}>
                + Ingresar monto del fondo
              </Button>
            </div>
          )}

          {fund && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
                <div className="text-sm text-muted-foreground">Monto a dividir</div>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold">        
                    ${fund.targetAmount.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                  </div>
                  {/* Botón editar: pasa id y valor actual al dialog */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setFundOpen(true)}
                  >
                    Editar
                  </Button>
                </div>
              </div>

              {loadingBreakdown && (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-1 animate-pulse">
                      <div className="h-4 w-1/2 rounded bg-muted" />
                      <div className="h-2 w-full rounded bg-muted" />
                    </div>
                  ))}
                </div>
              )}

              {noBreakdown && !loadingBreakdown && (
                <div className="flex flex-col items-start gap-2 rounded-lg border border-dashed px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    Cargá los salarios para ver cuánto aporta cada uno.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSalaryOpen(true)}>
                    + Ingresar salarios
                  </Button>
                </div>
              )}

              {breakdown && (
                <>
                  <div className="space-y-4">
                    {breakdown.breakdown.map((item) => (
                      <ContributionBar key={item.userId} item={item} max={maxContribution} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-2 text-muted-foreground"
                      onClick={() => setSalaryOpen(true)}
                    >
                      Editar salarios
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Ingresos combinados: ${breakdown.totalSalaries.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cuando hay fondo, le pasa el id y el valor actual para editar */}
      <SharedFundDialog
        open={fundOpen}
        onOpenChange={setFundOpen}
        year={year}
        month={month}
        fundId={fund?.id}
        currentTargetAmount={fund?.targetAmount}
      />
      <MemberSalaryDialog
        open={salaryOpen}
        onOpenChange={setSalaryOpen}
        year={year}
        month={month}
        existingSalaries={breakdown?.breakdown}  
      />
    </>
  );
}