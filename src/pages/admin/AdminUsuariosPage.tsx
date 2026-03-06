// ========================
// La Red Chambera — Admin Usuarios (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import type { User } from '../../types';

export default function AdminUsuariosPage() {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const data = await api.getUsuarios();
            setUsuarios(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres eliminar este usuario? Sus vacantes y fichas también se borrarán.')) return;
        try {
            await api.deleteUsuario(id);
            setUsuarios(usuarios.filter((u) => u.id !== id));
        } catch (err) {
            alert('Error al eliminar usuario');
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Gestión de Usuarios</h1>
                <p className="text-slate-500">Administra los accesos y registros de toda la base de datos de la plataforma</p>
            </header>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-700">Todos los usuarios registrados ({usuarios.length})</h3>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Buscar..." className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-slate-400 transition-colors" />
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors">Filtrar</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">ID</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Nombre</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">WhatsApp</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Rol</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs">Municipio</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-2" />
                                        <p>Cargando registros...</p>
                                    </td>
                                </tr>
                            ) : usuarios.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium pb-12">
                                        No hay usuarios.
                                    </td>
                                </tr>
                            ) : (
                                usuarios.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-slate-400">#{u.id}</td>
                                        <td className="px-6 py-4 font-semibold text-slate-800 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs overflow-hidden shrink-0">
                                                {u.foto_perfil ? <img src={u.foto_perfil} alt="avatar" /> : u.nombre.charAt(0)}
                                            </div>
                                            {u.nombre}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium font-mono">{u.whatsapp}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${u.rol === 'admin'
                                                    ? 'bg-red-100 text-red-700 border border-red-200'
                                                    : u.rol === 'empleador'
                                                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                                                    }`}
                                            >
                                                {u.rol}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">Tejupilco de Hidalgo</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDelete(u.id)}
                                                    className="px-4 py-1.5 text-xs font-bold rounded-lg border-2 border-red-100 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
