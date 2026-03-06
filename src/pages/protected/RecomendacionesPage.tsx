// ========================
// La Red Chambera — Recomendaciones Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { Recomendacion } from '../../types';

export default function RecomendacionesPage() {
    const { user } = useAuth();
    const [recomendaciones, setRecomendaciones] = useState<Recomendacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.id) fetchRecomendaciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchRecomendaciones = async () => {
        try {
            const data = await api.getRecomendaciones(user!.id);
            setRecomendaciones(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando recomendaciones');
        } finally {
            setLoading(false);
        }
    };

    const promedio =
        recomendaciones.length > 0
            ? (recomendaciones.reduce((acc, curr) => acc + curr.puntuacion, 0) / recomendaciones.length).toFixed(1)
            : 0;

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <header className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">⭐ Verificaciones y Recomendaciones</h1>
                <p className="text-lg text-neutral-500">Tu reputación en La Red Chambera la construye la comunidad</p>
            </header>

            {/* Stats Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-5xl font-black text-warning mb-2 drop-shadow-md">{promedio}</span>
                    <div className="flex gap-1 mb-3 text-2xl text-warning">
                        {/* Simple star visualizer */}
                        {'★★★★★☆☆☆☆☆'.slice(5 - Math.round(Number(promedio)), 10 - Math.round(Number(promedio)))}
                    </div>
                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Calificación Global</span>
                </div>

                <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
                    <span className="text-5xl font-black text-primary mb-2 drop-shadow-md">{recomendaciones.length}</span>
                    <div className="text-4xl text-neutral-200 mb-3">💬</div>
                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Total Recibidas</span>
                </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                    <p className="text-neutral-600 font-medium">Cargando recomendaciones...</p>
                </div>
            ) : recomendaciones.length === 0 ? (
                <div className="text-center py-20 bg-white border border-neutral-200 border-dashed rounded-3xl flex flex-col items-center justify-center">
                    <span className="text-6xl block mb-6 drop-shadow-sm opacity-50">⭐</span>
                    <h3 className="text-2xl font-bold text-neutral-800 mb-3">Aún no tienes recomendaciones</h3>
                    <p className="text-neutral-500 max-w-md mb-8">
                        Pide a las personas con las que has trabajado que te dejen un comentario positivo para mejorar tu perfil.
                    </p>
                    <button className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-xl shadow-sm hover:bg-primary/5 transition-colors flex items-center gap-2">
                        <span>📱</span> Compartir mi perfil en WhatsApp
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-neutral-900 border-b border-neutral-200 pb-4">Lo que dicen de tu trabajo</h3>
                    <div className="flex flex-col gap-6">
                        {recomendaciones.map((rec) => (
                            <div key={rec.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-xl border border-neutral-200">
                                            👤
                                        </div>
                                        <div>
                                            <strong className="block text-neutral-900 font-bold">{rec.autor?.nombre || 'Usuario Registrado'}</strong>
                                            <div className="flex text-sm text-warning tracking-widest mt-0.5">
                                                {'★'.repeat(rec.puntuacion)}{'☆'.repeat(5 - rec.puntuacion)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full whitespace-nowrap hidden sm:inline-block">
                                        Verificado ✓
                                    </span>
                                </div>
                                <div className="pl-0 sm:pl-16">
                                    <p className="text-neutral-600 leading-relaxed bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 italic">
                                        "{rec.comentario}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
