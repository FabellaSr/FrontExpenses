import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/shared/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
