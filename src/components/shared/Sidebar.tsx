import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, CalendarCheck } from 'lucide-react';

const items = [
  { to: '/admin', label: 'Resumen', icon: LayoutDashboard, end: true },
  { to: '/admin/members', label: 'Miembros', icon: Users },
  { to: '/admin/monthly-close', label: 'Cierre mensual', icon: CalendarCheck },
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r bg-card p-4">
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent',
                isActive && 'bg-accent font-medium',
              )
            }
          >
            <Icon className="h-4 w-4" /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
