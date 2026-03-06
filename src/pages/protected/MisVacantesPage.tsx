// ========================
// La Red Chambera — Mis Vacantes Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import type { Vacante } from '../../types';

export default function MisVacantesPage() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMisVacantes();
    }, []);

    const fetchMisVacantes = async () => {
        try {
            const data = await api.getMisVacantes();
            setVacantes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando tus vacantes');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleEstado = async (id: number, currentEstado: boolean) => {
        try {
            await api.updateVacante(id, { activa: !currentEstado });
            setVacantes(
                vacantes.map((v) => (v.id === id ? { ...v, activa: !currentEstado } : v))
            );
        } catch (err) {
            alert('Error cambiando estado de la vacante');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta vacante? No podrás recuperarla.')) return;
        try {
            await api.deleteVacante(id);
            setVacantes(vacantes.filter((v) => v.id !== id));
        } catch (err) {
            alert('Error al eliminar la vacante');
        }
    };

    return (
        <div className="flex flex-col animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Mis Vacantes Publicadas</h1>
                    <p className="text-lg text-neutral-500">Gestiona los trabajos que has ofrecido a la comunidad</p>
                </div>
                <Link to="/crear-vacante" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dark text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
                    <span className="text-xl leading-none">+</span> Nueva Vacante
                </Link>
            </header>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                    <p className="text-neutral-600 font-medium">Buscando tus publicaciones...</p>
                </div>
            ) : vacantes.length === 0 ? (
                <div className="text-center py-20 bg-white border border-neutral-200 border-dashed rounded-3xl flex flex-col items-center justify-center">
                    <span className="text-6xl block mb-6 drop-shadow-sm opacity-50">📌</span>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-3">No tienes vacantes activas</h3>
                    <p className="text-neutral-500 max-w-md mb-8">
                        Aquí aparecerán los anuncios de trabajo que publiques para que los trabajadores te contacten.
                    </p>
                    <Link to="/crear-vacante" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-dark transition-colors">
                        Publicar una vacante ahora
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4 font-bold text-neutral-500 uppercase tracking-wider text-xs">Rol / Título</th>
                                <th className="px-6 py-4 font-bold text-neutral-500 uppercase tracking-wider text-xs">Ubicación</th>
                                <th className="px-6 py-4 font-bold text-neutral-500 uppercase tracking-wider text-xs">Estado</th>
                                <th className="px-6 py-4 font-bold text-neutral-500 uppercase tracking-wider text-xs text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {vacantes.map((v) => (
                                <tr key={v.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-neutral-900 text-base">{v.titulo}</span>
                                            <span className="text-xs font-semibold text-primary bg-primary/10 w-fit px-2 py-0.5 rounded-full">{v.tipo_trabajo}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-neutral-600 font-medium">
                                        📍 Tejupilco de Hidalgo
                                    </td>
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${v.activa
                                                ? 'bg-green-100 text-green-700 border border-green-200'
                                                : 'bg-neutral-200 text-neutral-600 border border-neutral-300'
                                                }`}
                                        >
                                            {v.activa ? '🟢 Activa' : '⚪ Pausada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleEstado(v.id, v.activa)}
                                                className={`px-4 py-2 text-xs font-bold rounded-lg border-2 transition-colors ${v.activa
                                                    ? 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                                                    : 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
                                                    }`}
                                            >
                                                {v.activa ? 'Pausar' : 'Activar'}
                                            </button>
                                            <button className="px-4 py-2 text-xs font-bold rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-colors">
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(v.id)}
                                                className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-red-100 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-colors"
                                                title="Eliminar vacante"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
