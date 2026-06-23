import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/auth/useAuth';

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="border-b bg-card">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold">Expenses</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-primary">Dashboard</Link>
          <Link to="/expenses" className="hover:text-primary">Gastos</Link>
          <Link to="/reports" className="hover:text-primary">Reportes</Link>
          
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="hover:text-primary">{user.name}</Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user && (
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
          {!user && (
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
              <Link to="/auth" className="hover:text-primary">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
