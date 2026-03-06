// ========================
// La Red Chambera — Mis Fichas Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { FichaTrabajo } from '../../types';

export default function MisFichasPage() {
    const { user } = useAuth();
    const [fichas, setFichas] = useState<FichaTrabajo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.id) fetchFichas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchFichas = async () => {
        try {
            // Filtrar por el ID del usuario actual
            const data = await api.getFichas(user?.id);
            setFichas(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando fichas');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta ficha? Esta acción no se puede deshacer.')) return;
        try {
            await api.deleteFicha(id);
            setFichas(fichas.filter((f) => f.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Error al eliminar la ficha');
        }
    };

    return (
        <div className="flex flex-col animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Mis Fichas de Trabajo</h1>
                    <p className="text-lg text-neutral-500">Administra la evidencia de tu trabajo para los empleadores</p>
                </div>
                <Link to="/crear-ficha" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-dark text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
                    <span className="text-xl leading-none">+</span> Nueva Ficha
                </Link>
            </header>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                    <p className="text-neutral-600 font-medium">Cargando tus fichas...</p>
                </div>
            ) : fichas.length === 0 ? (
                <div className="text-center py-20 bg-white border border-neutral-200 border-dashed rounded-3xl flex flex-col items-center justify-center">
                    <span className="text-6xl block mb-6 drop-shadow-sm">📸</span>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-3">Aún no tienes fichas de trabajo</h3>
                    <p className="text-neutral-500 max-w-md mb-8">
                        Las fichas de trabajo son como tu currículum visual. Sube fotos de trabajos anteriores para que los empleadores confíen en ti.
                    </p>
                    <Link to="/crear-ficha" className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-dark transition-colors">
                        Crear mi primera ficha
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {fichas.map((ficha) => (
                        <div key={ficha.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                            <div className="h-48 overflow-hidden bg-neutral-100 relative">
                                {ficha.imagenes && ficha.imagenes.length > 0 ? (
                                    <>
                                        <img src={ficha.imagenes[0]} alt={ficha.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {ficha.imagenes.length > 1 && (
                                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                                <span>📸</span> +{ficha.imagenes.length - 1} fotos
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-5xl text-neutral-300">
                                        📷
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full self-start mb-3">
                                    {ficha.tipo_trabajo}
                                </span>
                                <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">{ficha.titulo}</h3>
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-1">{ficha.descripcion}</p>
                                <div className="text-xs text-neutral-400 font-medium mb-5">
                                    Realizado: {ficha.fecha_realizacion ? new Date(ficha.fecha_realizacion).toLocaleDateString() : 'Fecha no especificada'}
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-neutral-100 mt-auto">
                                    <button className="flex-1 py-2 text-sm font-semibold border-2 border-neutral-200 text-neutral-600 rounded-lg hover:border-primary hover:text-primary transition-colors">
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ficha.id)}
                                        className="flex-1 py-2 text-sm font-semibold border-2 border-neutral-200 text-red-500 rounded-lg hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
