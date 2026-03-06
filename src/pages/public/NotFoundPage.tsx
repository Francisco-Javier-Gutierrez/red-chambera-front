// ========================
// La Red Chambera — Not Found Page (Tailwind)
// ========================

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in zoom-in-95 duration-500">
            <span className="text-6xl md:text-8xl block mb-8">🚧</span>
            <h1 className="text-6xl md:text-8xl font-black text-primary leading-none mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">Página no encontrada</h2>
            <p className="text-neutral-500 mb-10 max-w-md mx-auto text-lg">
                Parece que te perdiste en el camino. La página que buscas no existe o fue movida.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/" className="px-6 py-3 font-bold rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white hover:shadow-lg hover:-translate-y-1 transition-all">
                    Ir al Inicio
                </Link>
                <Link to="/vacantes" className="px-6 py-3 font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                    Buscar Vacantes
                </Link>
            </div>
        </div>
    );
}
