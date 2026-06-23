import { SalaryBreakdownItem } from "..";

export function ContributionBar({ item, max }: { item: SalaryBreakdownItem; max: number }) {
  const widthPct = (item.contribution / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{item.name}</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>{item.percentage.toFixed(1)}%</span>
          <span className="font-semibold text-foreground">
            ${item.contribution.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Salario: ${item.salary.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
      </p>
    </div>
  );
}