// ========================
// La Red Chambera — Mi Perfil (Tailwind)
// ========================

import { useAuth } from '../../context/AuthContext';

export default function MiPerfilPage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-3xl animate-in fade-in duration-300">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Mi Perfil</h1>
                <p className="text-lg text-neutral-500">Gestiona tu información personal</p>
            </header>

            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-10 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary-light to-primary flex items-center justify-center border-4 border-white shadow-lg">
                        {user.foto_perfil ? (
                            <img src={user.foto_perfil} alt={user.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-bold text-white uppercase">{(user.nombre || 'U').charAt(0)}</span>
                        )}
                    </div>
                    <button className="text-sm font-semibold text-primary hover:text-primary-dark border border-primary/30 bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                        Cambiar Foto
                    </button>
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-b border-neutral-100 pb-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nombre Completo</span>
                            <span className="font-medium text-lg text-neutral-900">{user.nombre}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Rol de Cuenta</span>
                            <span className="font-medium text-lg text-neutral-900 capitalize flex items-center gap-2">
                                {user.rol === 'trabajador' ? '👷' : '🏢'} {user.rol}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">WhatsApp Registrado</span>
                            <span className="font-medium text-lg text-neutral-900">{user.whatsapp}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Municipio Base</span>
                            <span className="font-medium text-lg text-neutral-900 flex items-center gap-1">📍 {user.municipio}</span>
                        </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-neutral-100">
                        <button className="px-6 py-2.5 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors shadow-sm w-full md:w-auto">
                            Editar Información
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
