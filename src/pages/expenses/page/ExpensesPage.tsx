import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { ExpenseFormDialog } from '../components/ExpensesFormDialog';
import { useExpenses } from '@/pages/expenses/hooks/useExpenses';
import { useCategories } from '@/hooks/useCategories';
import NotFoundPage from '@/pages/NotFoundPage';
import type { Expense, UseExpensesParams } from '@/interfaces';
import { useCreateExpense } from '@/pages/expenses/hooks/useCreateExpense';
import { useMembers } from '@/pages/members/hooks/useMembers';

const PAGE_SIZE = 20;

export const ExpensesPage = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const now = new Date(); 
  const params: UseExpensesParams = { month: now.getMonth() + 1, year: now.getFullYear() };


  const { data: expenses, error } = useExpenses(params);
  const { data: categories } = useCategories();
  const createExpenseMutation = useCreateExpense();
  const { data: users } = useMembers();

  // FIX: mapas precalculados para evitar .find() en cada celda del render
  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );
  const userMap = useMemo(
    () => Object.fromEntries(users.map((u) => [u.id, u.name])),
    [users],
  );

  // Paginación simple en cliente
  const totalPages = Math.ceil(expenses.length / PAGE_SIZE);
  const paginated = expenses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleSubmit = async (expenseLike: Partial<Expense>) => {
    const formData = new FormData();
    formData.append('date', expenseLike.date!);
    formData.append('categoryId', expenseLike.categoryId!);
    formData.append('concept', expenseLike.concept!);
    formData.append('amount', String(expenseLike.amount));

    try {
      await createExpenseMutation.mutateAsync(formData);
      toast.success('Gasto creado correctamente');
      setOpen(false);
      setPage(1); // volver a la primera página al crear
    } catch (error) {
      console.log(error);
      toast.error('Error al crear el gasto');
    }
  };

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Gastos</h1>
        <Button onClick={() => setOpen(true)}>Nuevo gasto</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Listado</CardTitle></CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <EmptyState title="Sin gastos" description="Cargá el primer gasto del mes." />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted-foreground">
                    <tr>
                      <th className="py-2">Fecha</th>
                      <th>Categoría</th>
                      <th>Concepto</th>
                      <th>Usuario</th>
                      <th className="text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((e) => ( 
                      <tr key={e.id} className="border-t">
                        <td className="py-2">{e.date}</td>
                        <td>{categoryMap[e.categoryId] ?? '—'}</td>
                        <td>{e.concept}</td>
                        <td>{userMap[e.userId] ?? '—'}</td>
                        <td className="text-right">${e.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Controles de paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                  <span>
                    Página {page} de {totalPages} — {expenses.length} gastos
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ExpenseFormDialog
        open={open}
        onOpenChange={setOpen}
        categories={categories}
        onSubmit={handleSubmit}
        isPending={createExpenseMutation.isPending}
      />
    </div>
  );
};
