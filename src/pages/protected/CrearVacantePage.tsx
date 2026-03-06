// ========================
// La Red Chambera — Crear Vacante (Tailwind)
// ========================

import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../../services/api';



const TIPOS_TRABAJO = [
    'Albañilería', 'Campo', 'Cocina', 'Mecánica', 'Limpieza',
    'Electricidad', 'Plomería', 'Carpintería', 'Herrería', 'Pintura',
    'Jardinería', 'Costura', 'Comercio', 'Transporte', 'Otro',
];

export default function CrearVacantePage() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoTrabajo, setTipoTrabajo] = useState('');
    const [horario, setHorario] = useState('');
    const [pago, setPago] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.createVacante({
                titulo,
                descripcion,
                tipo_trabajo: tipoTrabajo,
                horario,
                pago,
                requisitos,
                whatsapp_contacto: whatsapp,
                tipo_registro: 'vacante',
            });
            navigate('/mis-vacantes');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creando vacante');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
            <Link to="/mis-vacantes" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary mb-6 transition-colors">
                <span>←</span> Volver a Mis Vacantes
            </Link>

            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-sm">
                <header className="mb-8 text-center sm:text-left border-b border-neutral-100 pb-6">
                    <span className="text-4xl block sm:hidden mb-4">📢</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2 flex items-center gap-3 justify-center sm:justify-start">
                        <span className="hidden sm:inline-block">📢</span> Publicar Vacante
                    </h1>
                    <p className="text-neutral-500">Crea un anuncio claro para encontrar al chambeador ideal.</p>
                </header>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-8 font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="font-semibold text-sm text-neutral-700">Título de la vacante</label>
                        <input
                            id="titulo"
                            type="text"
                            placeholder="Ej: Se busca oficial albañil para barda"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tipo" className="font-semibold text-sm text-neutral-700">Categoría</label>
                            <div className="relative">
                                <select
                                    id="tipo"
                                    value={tipoTrabajo}
                                    onChange={(e) => setTipoTrabajo(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 appearance-none cursor-pointer"
                                >
                                    <option value="">Selecciona...</option>
                                    {TIPOS_TRABAJO.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="descripcion" className="font-semibold text-sm text-neutral-700">Descripción completa</label>
                        <textarea
                            id="descripcion"
                            rows={4}
                            placeholder="Explica de qué trata el trabajo, qué hay que hacer, etc."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="horario" className="font-semibold text-sm text-neutral-700">Horario requerido</label>
                            <div className="relative">
                                <select
                                    id="horario"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 appearance-none cursor-pointer"
                                >
                                    <option value="">Selecciona...</option>
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

                        <div className="flex flex-col gap-2">
                            <label htmlFor="pago" className="font-semibold text-sm text-neutral-700">Pago ofrecido / Presupuesto</label>
                            <input
                                id="pago"
                                type="text"
                                placeholder="Ej: $350 al día, a tratar"
                                value={pago}
                                onChange={(e) => setPago(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="requisitos" className="font-semibold text-sm text-neutral-700">Requisitos (Opcional)</label>
                        <textarea
                            id="requisitos"
                            rows={2}
                            placeholder="Ej: Traer herramienta propia, 2 años de experiencia..."
                            value={requisitos}
                            onChange={(e) => setRequisitos(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 resize-y"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="whatsapp" className="font-semibold text-sm text-neutral-700">WhatsApp para recibir candidatos</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📱</span>
                            <input
                                id="whatsapp"
                                type="tel"
                                placeholder="Ej: 5217771234567"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                            />
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                            Es importante agregar el código de país (ej. 521 para México) para que el enlace sirva directo.
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-[#a85520] shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Publicando...' : 'Publicar Vacante'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
