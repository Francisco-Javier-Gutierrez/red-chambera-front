// ========================
// La Red Chambera — Home Page (Tailwind)
// ========================

import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="flex flex-col gap-12 md:gap-24">
            {/* Hero */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-24 animate-in fade-in duration-500">
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 tracking-tight">
                        Encuentra <span className="text-primary bg-primary/10 px-2 rounded-lg">chamba</span> o encuentra{' '}
                        <span className="text-primary bg-primary/10 px-2 rounded-lg">chambeadores</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 max-w-xl mx-auto md:mx-0">
                        La plataforma comunitaria que conecta trabajadores con negocios,
                        talleres, mercados y ranchos en el sur del Estado de México. Sin
                        currículum, solo tu trabajo habla por ti.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
                        <Link to="/registro" className="px-8 py-4 text-lg font-bold rounded-xl shadow-lg shadow-primary/30 bg-gradient-to-br from-primary to-primary-dark text-white hover:scale-[1.02] hover:shadow-xl transition-all">
                            Regístrate Gratis
                        </Link>
                        <Link to="/vacantes" className="px-8 py-4 text-lg font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                            Ver Vacantes
                        </Link>
                    </div>
                </div>

                <div className="relative grid grid-cols-2 gap-4 max-w-sm mx-auto md:max-w-none">
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all animate-in slide-in-from-bottom-8 duration-500 delay-100">
                        <span className="text-4xl">👷</span>
                        <span className="font-semibold text-neutral-700">Albañilería</span>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all animate-in slide-in-from-bottom-8 duration-500 delay-200 translate-y-6">
                        <span className="text-4xl">🌾</span>
                        <span className="font-semibold text-neutral-700">Campo</span>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all animate-in slide-in-from-bottom-8 duration-500 delay-300">
                        <span className="text-4xl">🔧</span>
                        <span className="font-semibold text-neutral-700">Mecánica</span>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all animate-in slide-in-from-bottom-8 duration-500 delay-400 translate-y-6">
                        <span className="text-4xl">🍳</span>
                        <span className="font-semibold text-neutral-700">Cocina</span>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-12 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-neutral-900">¿Cómo funciona?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
                    <div className="flex flex-col items-center p-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-black flex items-center justify-center mb-6 shadow-lg">1</div>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Regístrate con WhatsApp</h3>
                        <p className="text-neutral-600">Solo necesitas tu número de WhatsApp. Sin correo, sin currículum.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 relative">
                        <div className="hidden md:block absolute top-14 -left-1/2 w-full h-[2px] bg-neutral-200 -z-10"></div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-black flex items-center justify-center mb-6 shadow-lg">2</div>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Crea tu ficha de trabajo</h3>
                        <p className="text-neutral-600">Sube fotos de tus trabajos realizados y describe lo que sabes hacer.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 relative">
                        <div className="hidden md:block absolute top-14 -left-1/2 w-full h-[2px] bg-neutral-200 -z-10"></div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-black flex items-center justify-center mb-6 shadow-lg">3</div>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Conecta directo</h3>
                        <p className="text-neutral-600">Los empleadores te contactan por WhatsApp. Trato directo, sin intermediarios.</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-neutral-900">¿Por qué La Red Chambera?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <span className="text-5xl block mb-6 drop-shadow-md">📱</span>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Solo WhatsApp</h3>
                        <p className="text-neutral-600 text-sm">No necesitas correo electrónico ni documentos complicados.</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <span className="text-5xl block mb-6 drop-shadow-md">⭐</span>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Recomendaciones</h3>
                        <p className="text-neutral-600 text-sm">Tu reputación se construye con votos de confianza de la comunidad.</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <span className="text-5xl block mb-6 drop-shadow-md">📷</span>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">Evidencia visual</h3>
                        <p className="text-neutral-600 text-sm">Muestra tu trabajo con fotos. Las imágenes valen más que un CV.</p>
                    </div>
                    <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <span className="text-5xl block mb-6 drop-shadow-md">🏘️</span>
                        <h3 className="text-xl font-bold mb-3 text-neutral-900">100% Local</h3>
                        <p className="text-neutral-600 text-sm">Enfocado en el sur del Estado de México. Tu comunidad, tu red.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12">
                <div className="bg-gradient-to-br from-primary to-accent-dark rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl"></div>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 relative z-10">¿Listo para encontrar chamba?</h2>
                    <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">Únete a La Red Chambera y muestra lo que sabes hacer.</p>
                    <Link to="/registro" className="inline-block px-8 py-4 text-lg font-bold bg-white text-primary-dark rounded-xl hover:bg-neutral-50 hover:shadow-xl hover:-translate-y-1 transition-all relative z-10">
                        Crear mi cuenta gratis
                    </Link>
                </div>
            </section>
        </div>
    );
}
