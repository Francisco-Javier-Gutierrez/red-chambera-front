// ========================
// La Red Chambera — Public Layout (Tailwind)
// ========================

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 scroll-smooth">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
