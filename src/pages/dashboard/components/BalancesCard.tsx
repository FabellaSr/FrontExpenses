import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; 

import type { ReportDebt } from '@/interfaces';

interface Props {
  debts: ReportDebt[];
}

export function BalancesCard({ debts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {debts.length > 0 ? (
          debts.map((debt, index) => (
            <div
              key={index}
              className="text-sm font-medium"
            >
              {debt.from} le debe $
              {debt.amount.toLocaleString()} a {debt.to}
            </div>
          ))
        ) : (
          <div className="text-sm">
            Todos están equilibrados
          </div>
        )}
      </CardContent>
    </Card>
  );
}