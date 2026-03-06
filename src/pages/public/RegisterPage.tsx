// ========================
// La Red Chambera — Register Page (Tailwind)
// ========================

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MUNICIPIOS = [
    'Tejupilco', 'Temascaltepec', 'San Simón de Guerrero', 'Sultepec',
    'Amatepec', 'Tlatlaya', 'Luvianos', 'Zacualpan', 'Almoloya de Alquisiras',
    'Texcaltitlán', 'Coatepec Harinas', 'Ixtapan de la Sal', 'Tonatico',
    'Pilcaya', 'Zumpahuacán', 'Malinalco', 'Ocuilan', 'Tenancingo',
];

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState<'trabajador' | 'empleador'>('trabajador');
    const [municipio, setMunicipio] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            await register({ nombre, whatsapp, password, rol, municipio });
            navigate('/mi-perfil', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-12 px-4 animate-in fade-in duration-300">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 w-full max-w-xl shadow-xl flex flex-col">
                <div className="text-center mb-8">
                    <span className="text-5xl block mb-4">🔨</span>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Crear Cuenta</h1>
                    <p className="text-neutral-500">Regístrate con tu WhatsApp y empieza a conectar</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 mb-6 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Role selector */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className={`flex flex-col items-center gap-2 p-4 md:p-6 border-2 rounded-xl transition-all font-semibold text-sm ${rol === 'trabajador'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-primary-light'
                                }`}
                            onClick={() => setRol('trabajador')}
                        >
                            <span className="text-3xl">👷</span>
                            <span>Busco Chamba</span>
                        </button>
                        <button
                            type="button"
                            className={`flex flex-col items-center gap-2 p-4 md:p-6 border-2 rounded-xl transition-all font-semibold text-sm ${rol === 'empleador'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-primary-light'
                                }`}
                            onClick={() => setRol('empleador')}
                        >
                            <span className="text-3xl">🏢</span>
                            <span>Ofrezco Chamba</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="nombre" className="font-semibold text-sm text-neutral-700">Nombre completo</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                        />
                    </div>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-semibold text-sm text-neutral-700">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirm-password" className="font-semibold text-sm text-neutral-700">Confirmar contraseña</label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Repite tu contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="municipio" className="font-semibold text-sm text-neutral-700">Municipio</label>
                        <div className="relative">
                            <select
                                id="municipio"
                                value={municipio}
                                onChange={(e) => setMunicipio(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all bg-neutral-50 focus:bg-white text-neutral-900 appearance-none cursor-pointer"
                            >
                                <option value="">Selecciona tu municipio</option>
                                {MUNICIPIOS.map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-gradient-to-br from-primary to-primary-dark hover:from-primary-dark hover:to-[#a85520] shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
                    </button>
                </form>

                <div className="text-center mt-8 pt-6 border-t border-neutral-100 text-sm text-neutral-500">
                    <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
