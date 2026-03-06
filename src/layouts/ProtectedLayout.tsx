// ========================
// La Red Chambera — Protected Layout (Tailwind)
// ========================

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function ProtectedLayout() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-neutral-50">
            <Sidebar />
            <main className="flex-1 md:ml-72 p-4 md:p-8 min-h-screen w-full">
                <Outlet />
            </main>
        </div>
    );
}
