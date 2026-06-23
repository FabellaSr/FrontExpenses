import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Panel administrador</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Mes activo</CardTitle></CardHeader><CardContent>Mayo 2025</CardContent></Card>
        <Card><CardHeader><CardTitle>Miembros</CardTitle></CardHeader><CardContent>3</CardContent></Card>
        <Card><CardHeader><CardTitle>Estado</CardTitle></CardHeader><CardContent>Abierto</CardContent></Card>
      </div>
    </div>
  );
}
