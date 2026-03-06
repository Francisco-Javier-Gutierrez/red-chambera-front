// ========================
// La Red Chambera — Protected Route Guard (Tailwind)
// ========================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types';

interface Props {
    children: React.ReactNode;
    roles?: Rol[];
}

export default function ProtectedRoute({ children, roles }: Props) {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-12 gap-4">
                <div className="w-10 h-10 border-4 border-neutral-200 border-t-primary rounded-full animate-spin" />
                <p className="text-neutral-600 font-medium">Cargando...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && user && !roles.includes(user.rol)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
