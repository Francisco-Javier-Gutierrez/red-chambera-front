// ========================
// La Red Chambera — Admin Layout (Tailwind)
// ========================

import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminLayout() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 md:ml-72 p-4 md:p-8 min-h-screen w-full">
                <Outlet />
            </main>
        </div>
    );
}
