// ========================
// La Red Chambera — Admin Sidebar (Tailwind)
// ========================

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="w-full md:w-72 md:min-h-screen bg-slate-900 md:border-r border-b md:border-b-0 border-slate-800 p-4 md:p-6 flex flex-row md:flex-col md:fixed top-0 left-0 overflow-y-auto">
            <div className="flex md:flex-col items-center gap-4 md:gap-0 md:text-center md:pb-8 md:mb-8 md:border-b border-slate-800 border-none w-auto md:w-full">
                <div className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center flex-shrink-0 md:mx-auto md:mb-4 border border-slate-700">
                    <span className="text-white font-bold md:text-3xl text-lg">
                        ⚙️
                    </span>
                </div>
                <div className="flex flex-col items-start md:items-center">
                    <h3 className="text-lg font-semibold text-white md:mb-1 leading-tight">{user?.nombre}</h3>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        🛡️ Administrador
                    </span>
                </div>
            </div>

            <nav className="flex md:flex-col flex-row overflow-x-auto w-full gap-2 md:gap-1 mt-4 md:mt-0 pb-2 md:pb-0 flex-1 items-center md:items-stretch">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                            ? 'bg-primary/20 text-primary-light font-semibold'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    📊 Dashboard
                </NavLink>
                <NavLink
                    to="/admin/usuarios"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                            ? 'bg-primary/20 text-primary-light font-semibold'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    👥 Usuarios
                </NavLink>
                <NavLink
                    to="/admin/contenido"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                            ? 'bg-primary/20 text-primary-light font-semibold'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    📝 Contenido
                </NavLink>
            </nav>

            <button
                onClick={logout}
                className="mt-4 md:mt-auto px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors bg-transparent border border-slate-700 text-slate-400 hover:bg-red-500 hover:text-white hover:border-red-500 whitespace-nowrap"
            >
                🚪 Cerrar Sesión
            </button>
        </aside>
    );
}
