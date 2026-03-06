// ========================
// La Red Chambera — Vacantes Page (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import type { Vacante, VacanteFilters } from '../../types';

const MUNICIPIOS = [
    'Tejupilco', 'Temascaltepec', 'San Simón de Guerrero', 'Sultepec',
    'Amatepec', 'Tlatlaya', 'Luvianos', 'Zacualpan', 'Almoloya de Alquisiras',
    'Texcaltitlán', 'Coatepec Harinas', 'Ixtapan de la Sal', 'Tonatico',
    'Pilcaya', 'Zumpahuacán', 'Malinalco', 'Ocuilan', 'Tenancingo',
];

const TIPOS_TRABAJO = [
    'Albañilería', 'Campo', 'Cocina', 'Mecánica', 'Limpieza',
    'Electricidad', 'Plomería', 'Carpintería', 'Herrería', 'Pintura',
    'Jardinería', 'Costura', 'Comercio', 'Transporte', 'Otro',
];

export default function VacantesPage() {
    const [vacantes, setVacantes] = useState<Vacante[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState<VacanteFilters>({});
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchVacantes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, page]);

    const fetchVacantes = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.getVacantes({ ...filters, page, limit: 12 });
            setVacantes(res.data);
            setTotalPages(res.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando vacantes');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">🔍 Vacantes Disponibles</h1>
                <p className="text-lg text-neutral-600">Encuentra la chamba que estás buscando en tu municipio</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="relative">
                    <select
                        className="appearance-none bg-white border border-neutral-300 text-neutral-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer w-[200px]"
                        value={filters.municipio || ''}
                        onChange={(e) => {
                            setFilters({ ...filters, municipio: e.target.value || undefined });
                            setPage(1);
                        }}
                    >
                        <option value="">Todos los municipios</option>
                        {MUNICIPIOS.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                <div className="relative">
                    <select
                        className="appearance-none bg-white border border-neutral-300 text-neutral-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer w-[200px]"
                        value={filters.tipo_trabajo || ''}
                        onChange={(e) => {
                            setFilters({ ...filters, tipo_trabajo: e.target.value || undefined });
                            setPage(1);
                        }}
                    >
                        <option value="">Todos los trabajos</option>
                        {TIPOS_TRABAJO.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                <div className="relative">
                    <select
                        className="appearance-none bg-white border border-neutral-300 text-neutral-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer w-[200px]"
                        value={filters.horario || ''}
                        onChange={(e) => {
                            setFilters({ ...filters, horario: e.target.value || undefined });
                            setPage(1);
                        }}
                    >
                        <option value="">Cualquier horario</option>
                        <option value="Tiempo completo">Tiempo completo</option>
                        <option value="Medio tiempo">Medio tiempo</option>
                        <option value="Por día">Por día</option>
                        <option value="Por proyecto">Por proyecto</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>

            {/* Results */}
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                    <p className="text-neutral-600 font-medium">Buscando vacantes...</p>
                </div>
            ) : vacantes.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                    <span className="text-5xl block mb-4">📭</span>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">No hay vacantes con esos filtros</h3>
                    <p>Intenta cambiar los filtros o vuelve más tarde.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {vacantes.map((v) => (
                            <Link
                                to={`/vacantes/${v.id}`}
                                key={v.id}
                                className="bg-white border border-neutral-200 rounded-xl p-5 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                        {v.tipo_trabajo}
                                    </span>
                                    <span className="text-xs text-neutral-400 font-medium">{v.horario}</span>
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">{v.titulo}</h3>
                                <p className="text-sm text-neutral-600 mb-6 flex-1 line-clamp-3">
                                    {v.descripcion}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-neutral-100 text-sm font-medium text-neutral-600">
                                    <span className="flex items-center gap-1">📍 {v.municipio}</span>
                                    <span className="flex items-center gap-1 text-green-600">💰 {v.pago}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-neutral-200">
                            <button
                                className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                ← Anterior
                            </button>
                            <span className="text-sm font-medium text-neutral-500">
                                Página {page} de {totalPages}
                            </span>
                            <button
                                className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
