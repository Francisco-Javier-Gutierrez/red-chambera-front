// ========================
// La Red Chambera — Admin Contenido (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import * as api from '../../services/api';

export default function AdminContenidoPage() {
    const [contenido, setContenido] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchContenido();
    }, []);

    const fetchContenido = async () => {
        try {
            const data = await api.getContenidoAdmin();
            setContenido(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando contenido');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (tipo: 'vacante' | 'ficha', id: number) => {
        if (!window.confirm(`¿Seguro que quieres eliminar esta ${tipo}?`)) return;
        try {
            await api.deleteContenido(tipo, id);
            setContenido(contenido.filter((c) => c.id !== id || c.tipo !== tipo));
        } catch (err) {
            alert('Error eliminando contenido');
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Moderación de Contenido</h1>
                    <p className="text-slate-500">Revisa la información que publican los usuarios para garantizar la calidad.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors">Vacantes</button>
                    <button className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors">Fichas Claves</button>
                </div>
            </header>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                    <p className="text-slate-600 font-medium">Revisando registros del servidor...</p>
                </div>
            ) : contenido.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl">
                    <span className="text-6xl block mb-6 opacity-30">🛡️</span>
                    <p className="text-slate-500 font-medium text-lg">No hay contenido reciente para moderar.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {contenido.map((item) => (
                        <div key={`${item.tipo}-${item.id}`} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${item.tipo === 'vacante'
                                            ? 'bg-orange-50 text-orange-600 border-orange-200'
                                            : 'bg-green-50 text-green-600 border-green-200'
                                            }`}
                                    >
                                        {item.tipo.toUpperCase()}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-400 font-mono">ID: {item.id}</span>
                                    <span className="text-xs font-semibold text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-full">{item.tipo_trabajo}</span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.titulo}</h3>
                                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{item.descripcion}</p>

                                {item.tipo === 'ficha' && item.imagenes && item.imagenes.length > 0 && (
                                    <div className="flex gap-2">
                                        {item.imagenes.slice(0, 3).map((img: string, i: number) => (
                                            <img key={i} src={img} alt="Preview" className="w-16 h-16 rounded-md object-cover border border-slate-200 shadow-sm" />
                                        ))}
                                        {item.imagenes.length > 3 && (
                                            <div className="w-16 h-16 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs shadow-sm">
                                                +{item.imagenes.length - 3}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex sm:flex-col gap-3 justify-center sm:justify-start items-center sm:items-end border-t sm:border-t-0 sm:border-l border-slate-100 pt-5 sm:pt-0 sm:pl-6 shrink-0 w-full sm:w-auto">
                                <button
                                    className="w-full sm:w-auto px-6 py-2 text-sm font-bold bg-white text-slate-700 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    Ver Detalles Completo
                                </button>
                                <button
                                    onClick={() => handleDelete(item.tipo, item.id)}
                                    className="w-full sm:w-auto px-6 py-2 text-sm font-bold bg-red-50 text-red-600 border-2 border-red-100 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    Eliminar permanentemente
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
