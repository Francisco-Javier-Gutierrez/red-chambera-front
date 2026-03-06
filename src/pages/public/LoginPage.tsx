// ========================
// La Red Chambera — Login Page (Tailwind)
// ========================

import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/mi-perfil';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ whatsapp, password });
            navigate(from, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-12 px-4 animate-in fade-in duration-300">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-md shadow-xl flex flex-col">
                <div className="text-center mb-8">
                    <span className="text-5xl block mb-4">🔨</span>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Iniciar Sesión</h1>
                    <p className="text-neutral-500">Entra con tu número de WhatsApp</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="whatsapp" className="font-semibold text-sm text-neutral-700">Número de WhatsApp</label>
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
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-semibold text-sm text-neutral-700">Contraseña</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                            <input
                                id="password"
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 rounded-xl font-bold text-white bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-[#a85520] shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="text-center mt-8 pt-6 border-t border-neutral-100 text-sm text-neutral-500">
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="text-primary font-bold hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
