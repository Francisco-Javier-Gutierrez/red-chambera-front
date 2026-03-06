// ========================
// La Red Chambera — Admin Dashboard (Tailwind)
// ========================

import { useState, useEffect } from 'react';
import * as api from '../../services/api';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await api.getAdminStats();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error cargando estadisticas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
                <p className="text-slate-600 font-medium">Reuniendo analíticas...</p>
            </div>
        );
    }

    if (error) {
        return <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">{error}</div>;
    }

    return (
        <div className="animate-in fade-in duration-300">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Panel de Control</h1>
                <p className="text-slate-500">Métricas principales de crecimiento de la plataforma</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-3xl shrink-0">👥</div>
                    <div>
                        <span className="block text-3xl font-black text-slate-800 tracking-tight">{stats?.totalUsuarios || 0}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Usuarios</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-3xl shrink-0">📢</div>
                    <div>
                        <span className="block text-3xl font-black text-slate-800 tracking-tight">{stats?.totalVacantes || 0}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Vacantes</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-3xl shrink-0">📸</div>
                    <div>
                        <span className="block text-3xl font-black text-slate-800 tracking-tight">{stats?.totalFichas || 0}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Fichas Claves</span>
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-3xl shrink-0">⭐</div>
                    <div>
                        <span className="block text-3xl font-black text-slate-800 tracking-tight">{stats?.totalRecomendaciones || 0}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Recomendaciones</span>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
                <div className="text-6xl mb-6">📈</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Monitor Administrativo Funcional</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-6">El sistema está funcionando con normalidad. Los índices de concurrencia y crecimiento orgánico están estables.</p>
                <button className="px-6 py-2 bg-slate-100 font-bold text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    Exportar Reporte Mensual
                </button>
            </div>
        </div>
    );
}
