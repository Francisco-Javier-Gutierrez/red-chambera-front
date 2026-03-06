// ========================
// La Red Chambera — Vacante Detail Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../../services/api';
import type { Vacante } from '../../types';

export default function VacanteDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [vacante, setVacante] = useState<Vacante | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVacante();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchVacante = async () => {
        if (!id) return;
        try {
            const data = await api.getVacante(parseInt(id, 10));
            setVacante(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando vacante');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                <p className="text-neutral-600 font-medium">Cargando detalles...</p>
            </div>
        );
    }

    if (error || !vacante) {
        return (
            <div className="text-center py-20 animate-in fade-in">
                <span className="text-5xl block mb-4">⚠️</span>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{error || 'Vacante no encontrada'}</h2>
                <Link to="/vacantes" className="text-primary font-medium hover:underline">
                    ← Volver a vacantes
                </Link>
            </div>
        );
    }

    // Pre-fill WhatsApp message
    const waMesage = encodeURIComponent(`Hola, vi tu vacante "${vacante.titulo}" en La Red Chambera y me interesa aplicar.`);
    const waUrl = `https://wa.me/${vacante.whatsapp_contacto}?text=${waMesage}`;

    return (
        <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
            <Link to="/vacantes" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary mb-8 transition-colors">
                <span>←</span> Volver a todas las vacantes
            </Link>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <header className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-neutral-100 pb-8 mb-8">
                    <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
                            {vacante.tipo_trabajo}
                        </span>
                        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 leading-tight">{vacante.titulo}</h1>
                        <p className="text-neutral-500 flex items-center gap-2">
                            <span>📍</span> Tejupilco de Hidalgo
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm font-bold text-neutral-400 uppercase tracking-wide">Horario</span>
                        <span className="block text-lg font-medium text-neutral-800 mb-2">{vacante.horario}</span>
                    </div>
                </header>

                <div className="py-2 border-b border-neutral-100 pb-8 mb-8">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3">Descripción de la vacante</h3>
                        <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">{vacante.descripcion}</p>
                    </div>

                    {vacante.requisitos && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-3">Requisitos</h3>
                            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">{vacante.requisitos}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-neutral-50 rounded-xl p-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Pago / Oferta</span>
                            <span className="text-xl font-bold text-green-600">{vacante.pago}</span>
                        </div>
                        {vacante.empleador && (
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Publicado por</span>
                                <span className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                                    <span>🏢</span> {vacante.empleador.nombre}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Estado</span>
                            <span className={`text-lg font-bold ${vacante.activa ? 'text-green-600' : 'text-neutral-400'}`}>
                                {vacante.activa ? 'Activa' : 'Cerrada'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    {vacante.activa ? (
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 text-xl font-bold text-white bg-[#25d366] rounded-xl hover:bg-[#1da855] hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 transition-all"
                        >
                            <span className="text-2xl">📱</span> Contactar por WhatsApp
                        </a>
                    ) : (
                        <button disabled className="inline-flex items-center gap-2 px-8 py-4 text-xl font-bold bg-neutral-100 text-neutral-400 rounded-xl cursor-not-allowed">
                            Esta vacante ya no está activa
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
