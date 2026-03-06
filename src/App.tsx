// ========================
// La Red Chambera — App Router
// ========================

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import VacantesPage from './pages/public/VacantesPage';
import VacanteDetailPage from './pages/public/VacanteDetailPage';
import EducativoPage from './pages/public/EducativoPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Protected Pages
import MiPerfilPage from './pages/protected/MiPerfilPage';
import MisFichasPage from './pages/protected/MisFichasPage';
import CrearFichaPage from './pages/protected/CrearFichaPage';
import RecomendacionesPage from './pages/protected/RecomendacionesPage';
import MisVacantesPage from './pages/protected/MisVacantesPage';
import CrearVacantePage from './pages/protected/CrearVacantePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsuariosPage from './pages/admin/AdminUsuariosPage';
import AdminContenidoPage from './pages/admin/AdminContenidoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ──────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/vacantes" element={<VacantesPage />} />
          <Route path="/vacantes/:id" element={<VacanteDetailPage />} />
          <Route path="/educativo" element={<EducativoPage />} />
        </Route>

        {/* ── Protected Routes (Trabajador / Empleador) */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/mi-perfil" element={<MiPerfilPage />} />
          <Route path="/mis-fichas" element={<MisFichasPage />} />
          <Route path="/crear-ficha" element={<CrearFichaPage />} />
          <Route path="/recomendaciones" element={<RecomendacionesPage />} />
          <Route path="/mis-vacantes" element={<MisVacantesPage />} />
          <Route path="/crear-vacante" element={<CrearVacantePage />} />
        </Route>

        {/* ── Admin Routes ───────────────────────────── */}
        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
          <Route path="/admin/contenido" element={<AdminContenidoPage />} />
        </Route>

        {/* ── 404 ────────────────────────────────────── */}
        <Route path="*" element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
