import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  return (
    <Card>
      <CardHeader><CardTitle>Crear cuenta</CardTitle></CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2"><Label>Nombre</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="space-y-2"><Label>Contraseña</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <Button className="w-full" type="submit">Registrarme</Button>
        </form>
      </CardContent>
    </Card>
  );
}
