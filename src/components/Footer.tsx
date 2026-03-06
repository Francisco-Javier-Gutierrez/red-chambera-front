// ========================
// La Red Chambera — Footer (Tailwind)
// ========================

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a2e] text-white/80 mt-auto pt-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🔨</span>
                        <span className="text-xl font-bold text-white">La Red Chambera</span>
                    </div>
                    <p className="text-white/60 text-sm max-w-sm">
                        Conectando trabajo y confianza en el sur del Estado de México.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Navegación</h4>
                    <Link to="/vacantes" className="text-white/75 text-sm hover:text-primary-light transition-colors">Vacantes</Link>
                    <Link to="/educativo" className="text-white/75 text-sm hover:text-primary-light transition-colors">Aprende</Link>
                    <Link to="/registro" className="text-white/75 text-sm hover:text-primary-light transition-colors">Registrarse</Link>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Contacto</h4>
                    <a
                        href="https://wa.me/5217771234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/75 text-sm hover:text-primary-light transition-colors flex items-center gap-2"
                    >
                        <span className="text-green-500">📱</span> WhatsApp Soporte
                    </a>
                </div>
            </div>

            <div className="border-t border-white/10 mt-12 py-6 text-center text-xs text-white/40">
                <p>© {new Date().getFullYear()} La Red Chambera. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
