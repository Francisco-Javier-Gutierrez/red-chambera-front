// ========================
// La Red Chambera — Educativo Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import type { ContenidoEducativo } from '../../types';

export default function EducativoPage() {
    const [contenidos, setContenidos] = useState<ContenidoEducativo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    useEffect(() => {
        fetchContenido();
    }, []);

    const fetchContenido = async () => {
        try {
            const data = await api.getContenidoEducativo();
            setContenidos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando contenido');
        } finally {
            setLoading(false);
        }
    };

    const categorias = Array.from(new Set(contenidos.map((c) => c.categoria)));
    const filtrados = filtroCategoria
        ? contenidos.filter((c) => c.categoria === filtroCategoria)
        : contenidos;

    return (
        <div className="flex flex-col animate-in fade-in">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">📚 Aprende y Crece</h1>
                <p className="text-lg md:text-xl text-neutral-600 max-w-2xl">
                    Consejos prácticos, guías de oficios y recursos para mejorar tu trabajo
                    y conseguir más recomendaciones.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-4">
                <button
                    className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all border ${filtroCategoria === ''
                            ? 'bg-primary border-primary text-white shadow-md'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary'
                        }`}
                    onClick={() => setFiltroCategoria('')}
                >
                    Todos
                </button>
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all border ${filtroCategoria === cat
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary'
                            }`}
                        onClick={() => setFiltroCategoria(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                    <p className="text-neutral-600 font-medium">Cargando material...</p>
                </div>
            ) : filtrados.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                    <span className="text-5xl block mb-4">📭</span>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">Aún no hay contenido en esta categoría</h3>
                    <p>Pronto agregaremos más material útil para ti.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtrados.map((item) => (
                        <article key={item.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group">
                            {item.imagen && (
                                <div className="h-48 overflow-hidden bg-neutral-100">
                                    <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-3 self-start">
                                    {item.categoria}
                                </span>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                                    {item.titulo}
                                </h3>
                                <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                                    {item.contenido}
                                </p>
                                <button className="text-primary font-bold text-sm tracking-wide hover:text-primary-dark uppercase self-start">
                                    Leer artículo completo →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
