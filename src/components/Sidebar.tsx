// ========================
// La Red Chambera — Sidebar (Tailwind)
// ========================

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <aside className="w-full md:w-72 md:min-h-screen bg-white md:border-r border-b md:border-b-0 border-neutral-200 p-4 md:p-6 flex flex-row md:flex-col md:fixed top-0 left-0 overflow-y-auto">
            <div className="flex md:flex-col items-center gap-4 md:gap-0 md:text-center md:pb-8 md:mb-8 md:border-b border-neutral-200 border-none w-auto md:w-full">
                <div className="w-10 h-10 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary-light to-primary flex items-center justify-center flex-shrink-0 md:mx-auto md:mb-4">
                    {user?.foto_perfil ? (
                        <img src={user.foto_perfil} alt={user.nombre} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-white font-bold md:text-3xl text-lg">
                            {user?.nombre?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="flex flex-col items-start md:items-center">
                    <h3 className="text-lg font-semibold text-neutral-900 md:mb-1 leading-tight">{user?.nombre}</h3>
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {user?.rol === 'empleador' ? '🏢 Empleador' : '👷 Trabajador'}
                    </span>
                </div>
            </div>

            <nav className="flex md:flex-col flex-row overflow-x-auto w-full gap-2 md:gap-1 mt-4 md:mt-0 pb-2 md:pb-0 flex-1 items-center md:items-stretch">
                <NavLink
                    to="/mi-perfil"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                        }`
                    }
                >
                    👤 Mi Perfil
                </NavLink>

                {user?.rol === 'trabajador' && (
                    <>
                        <NavLink
                            to="/mis-fichas"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                                }`
                            }
                        >
                            📋 Mis Fichas
                        </NavLink>
                        <NavLink
                            to="/recomendaciones"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                                }`
                            }
                        >
                            ⭐ Recomendaciones
                        </NavLink>
                    </>
                )}

                {user?.rol === 'empleador' && (
                    <>
                        <NavLink
                            to="/mis-vacantes"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                                }`
                            }
                        >
                            📌 Mis Vacantes
                        </NavLink>
                        <NavLink
                            to="/crear-vacante"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                                }`
                            }
                        >
                            ➕ Publicar Vacante
                        </NavLink>
                    </>
                )}

                <NavLink
                    to="/vacantes"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                        }`
                    }
                >
                    🔍 Ver Vacantes
                </NavLink>
            </nav>

            <button
                onClick={logout}
                className="mt-4 md:mt-auto px-4 py-2 md:py-3 rounded-lg font-medium text-sm transition-colors bg-white border border-neutral-200 text-neutral-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 whitespace-nowrap"
            >
                🚪 Cerrar Sesión
            </button>
        </aside>
    );
}
