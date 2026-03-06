// ========================
// La Red Chambera — Crear Ficha Page (Tailwind)
// ========================

import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../../services/api';

const TIPOS_TRABAJO = [
    'Albañilería', 'Campo', 'Cocina', 'Mecánica', 'Limpieza',
    'Electricidad', 'Plomería', 'Carpintería', 'Herrería', 'Pintura',
    'Jardinería', 'Costura', 'Comercio', 'Transporte', 'Otro',
];

export default function CrearFichaPage() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [tipoTrabajo, setTipoTrabajo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            if (images.length + selectedFiles.length > 5) {
                alert('Máximo 5 imágenes permitidas.');
                return;
            }
            setImages([...images, ...selectedFiles]);

            const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...imagePreviews];
        // Optional: URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            setError('Debes subir al menos 1 foto como evidencia de tu trabajo.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.createFicha({
                titulo,
                tipo_trabajo: tipoTrabajo,
                descripcion,
                fecha_realizacion: fecha || undefined,
                imagenes: images,
            });
            navigate('/mis-fichas');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error creando ficha');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
            <Link to="/mis-fichas" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary mb-6 transition-colors">
                <span>←</span> Volver a Mis Fichas
            </Link>

            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-10 shadow-sm">
                <header className="mb-8 text-center sm:text-left border-b border-neutral-100 pb-6">
                    <span className="text-4xl block sm:hidden mb-4">📸</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2 flex items-center gap-3 justify-center sm:justify-start">
                        <span className="hidden sm:inline-block">📸</span> Crear Ficha de Trabajo
                    </h1>
                    <p className="text-neutral-500">Sube fotos de tus trabajos anteriores para mostrar tu experiencia.</p>
                </header>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-8 font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="font-semibold text-sm text-neutral-700">Título del trabajo</label>
                        <input
                            id="titulo"
                            type="text"
                            placeholder="Ej: Construcción de barda perimetral"
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

                        <div className="flex flex-col gap-2">
                            <label htmlFor="fecha" className="font-semibold text-sm text-neutral-700">Fecha de realización (opcional)</label>
                            <input
                                id="fecha"
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 cursor-text"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="descripcion" className="font-semibold text-sm text-neutral-700">Descripción de las actividades</label>
                        <textarea
                            id="descripcion"
                            rows={4}
                            placeholder="Explica qué hiciste, cuánto tiempo te tomó, materiales que usaste, etc."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 resize-y"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <label className="font-semibold text-sm text-neutral-700">Evidencia fotográfica</label>
                            <span className="text-xs font-semibold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">{images.length}/5 fotos max.</span>
                        </div>

                        <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-1 bg-neutral-50 hover:bg-neutral-100 transition-colors group relative overflow-hidden">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                disabled={images.length >= 5}
                            />
                            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                <span className="text-4xl mb-3 text-neutral-400 group-hover:text-primary transition-colors">➕</span>
                                <p className="font-semibold text-neutral-700 mb-1">Toca aquí para seleccionar fotos</p>
                                <p className="text-xs text-neutral-500">Formatos: JPG, PNG, WEBP (Recomendado)</p>
                            </div>
                        </div>

                        {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {imagePreviews.map((src, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-sm group">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:scale-110 shadow-lg transition-transform"
                                                aria-label="Eliminar imagen"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-[#a85520] shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Subiendo ficha...' : 'Publicar Ficha de Trabajo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
