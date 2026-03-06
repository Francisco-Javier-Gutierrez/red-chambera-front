// ========================
// La Red Chambera — Navbar (Tailwind)
// ========================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-neutral-900 hover:text-primary transition-colors">
                    <span className="text-2xl">🔨</span>
                    <span>La Red Chambera</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/vacantes" className="text-neutral-600 font-medium hover:text-primary hover:bg-neutral-100 px-3 py-2 rounded-md transition-colors">
                        {user?.rol === 'empleador' ? 'Trabajadores' : 'Vacantes'}
                    </Link>
                    <Link to="/educativo" className="text-neutral-600 font-medium hover:text-primary hover:bg-neutral-100 px-3 py-2 rounded-md transition-colors">
                        Aprende
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3 ml-4 border-l border-neutral-200 pl-4">
                            <Link
                                to={user?.rol === 'admin' ? '/admin' : '/mi-perfil'}
                                className="text-neutral-700 font-medium hover:text-primary flex items-center gap-2"
                            >
                                <span>👤</span>
                                <span>{user?.nombre}</span>
                            </Link>
                            <button onClick={handleLogout} className="px-3 py-1.5 text-sm font-semibold border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all">
                                Salir
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 ml-4 border-l border-neutral-200 pl-4">
                            <Link to="/login" className="px-4 py-2 text-sm font-semibold border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all">
                                Entrar
                            </Link>
                            <Link to="/registro" className="px-4 py-2 text-sm font-semibold border-2 border-primary bg-gradient-to-br from-primary to-primary-dark text-white rounded-md hover:shadow-md hover:from-primary-dark hover:to-[#a85520] transition-all">
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-2xl text-neutral-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menú"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-xl flex flex-col p-4 gap-2">
                    <Link to="/vacantes" className="text-neutral-600 font-medium p-3 rounded-md hover:bg-neutral-100" onClick={() => setIsMenuOpen(false)}>
                        {user?.rol === 'empleador' ? 'Trabajadores' : 'Vacantes'}
                    </Link>
                    <Link to="/educativo" className="text-neutral-600 font-medium p-3 rounded-md hover:bg-neutral-100" onClick={() => setIsMenuOpen(false)}>
                        Aprende
                    </Link>

                    <hr className="my-2 border-neutral-200" />

                    {isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                            <Link
                                to={user?.rol === 'admin' ? '/admin' : '/mi-perfil'}
                                className="text-neutral-700 font-medium p-3 hover:bg-neutral-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                👤 {user?.nombre}
                            </Link>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-center px-4 py-2 text-sm font-semibold border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all">
                                Salir
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="w-full text-center px-4 py-2 text-sm font-semibold border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all" onClick={() => setIsMenuOpen(false)}>
                                Entrar
                            </Link>
                            <Link to="/registro" className="w-full text-center px-4 py-2 text-sm font-semibold border-2 border-primary bg-gradient-to-br from-primary to-primary-dark text-white rounded-md hover:shadow-md transition-all" onClick={() => setIsMenuOpen(false)}>
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
