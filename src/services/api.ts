// ========================
// La Red Chambera — API Service
// ========================

import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    Vacante,
    VacanteFilters,
    CreateVacanteRequest,
    FichaTrabajo,
    CreateFichaRequest,
    Recomendacion,
    CreateRecomendacionRequest,
    ContenidoEducativo,
    User,
    PaginatedResponse,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ── helpers ──────────────────────────────────────────────

function getToken(): string | null {
    return localStorage.getItem('token');
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const token = getToken();

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    // Don't set Content-Type for FormData (browser sets it with boundary)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Error de red' }));
        throw new Error(error.message || `Error ${res.status}`);
    }

    return res.json();
}

// ── Auth ─────────────────────────────────────────────────

export async function login(data: LoginRequest): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    return request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getMe(): Promise<User> {
    return request<User>('/auth/me');
}

// ── Vacantes ─────────────────────────────────────────────

export async function getVacantes(
    filters?: VacanteFilters,
): Promise<PaginatedResponse<Vacante>> {
    const params = new URLSearchParams();
    if (filters?.municipio) params.append('municipio', filters.municipio);
    if (filters?.tipo_trabajo) params.append('tipo_trabajo', filters.tipo_trabajo);
    if (filters?.horario) params.append('horario', filters.horario);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    return request<PaginatedResponse<Vacante>>(`/vacantes${query}`);
}

export async function getVacante(id: number): Promise<Vacante> {
    return request<Vacante>(`/vacantes/${id}`);
}

export async function createVacante(data: CreateVacanteRequest): Promise<Vacante> {
    return request<Vacante>('/vacantes', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateVacante(
    id: number,
    data: Partial<Vacante>,
): Promise<Vacante> {
    return request<Vacante>(`/vacantes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteVacante(id: number): Promise<void> {
    return request<void>(`/vacantes/${id}`, { method: 'DELETE' });
}

export async function getMisVacantes(): Promise<Vacante[]> {
    return request<Vacante[]>('/vacantes/mis-vacantes');
}

// ── Fichas de Trabajo ────────────────────────────────────

export async function getFichas(trabajadorId?: number): Promise<FichaTrabajo[]> {
    const query = trabajadorId ? `?trabajador_id=${trabajadorId}` : '';
    return request<FichaTrabajo[]>(`/fichas${query}`);
}

export async function getFicha(id: number): Promise<FichaTrabajo> {
    return request<FichaTrabajo>(`/fichas/${id}`);
}

export async function createFicha(data: CreateFichaRequest): Promise<FichaTrabajo> {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);
    formData.append('tipo_trabajo', data.tipo_trabajo);
    if (data.fecha_realizacion) formData.append('fecha_realizacion', data.fecha_realizacion);
    if (data.imagenes) {
        data.imagenes.forEach((img) => formData.append('imagenes', img));
    }

    return request<FichaTrabajo>('/fichas', {
        method: 'POST',
        body: formData,
    });
}

export async function deleteFicha(id: number): Promise<void> {
    return request<void>(`/fichas/${id}`, { method: 'DELETE' });
}

// ── Recomendaciones ──────────────────────────────────────

export async function getRecomendaciones(
    trabajadorId: number,
): Promise<Recomendacion[]> {
    return request<Recomendacion[]>(`/recomendaciones?trabajador_id=${trabajadorId}`);
}

export async function crearRecomendacion(
    data: CreateRecomendacionRequest,
): Promise<Recomendacion> {
    return request<Recomendacion>('/recomendaciones', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ── Contenido Educativo ──────────────────────────────────

export async function getContenidoEducativo(): Promise<ContenidoEducativo[]> {
    return request<ContenidoEducativo[]>('/educativo');
}

export async function getContenidoEducativoById(
    id: number,
): Promise<ContenidoEducativo> {
    return request<ContenidoEducativo>(`/educativo/${id}`);
}

// ── Admin ────────────────────────────────────────────────

export async function getUsuarios(): Promise<User[]> {
    return request<User[]>('/admin/usuarios');
}

export async function updateUsuario(
    id: number,
    data: Partial<User>,
): Promise<User> {
    return request<User>(`/admin/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function deleteUsuario(id: number): Promise<void> {
    return request<void>(`/admin/usuarios/${id}`, { method: 'DELETE' });
}

export async function getContenidoAdmin(): Promise<(Vacante | FichaTrabajo)[]> {
    return request<(Vacante | FichaTrabajo)[]>('/admin/contenido');
}

export async function deleteContenido(
    tipo: 'vacante' | 'ficha',
    id: number,
): Promise<void> {
    return request<void>(`/admin/contenido/${tipo}/${id}`, { method: 'DELETE' });
}

export async function getAdminStats(): Promise<{
    totalUsuarios: number;
    totalVacantes: number;
    totalFichas: number;
    totalRecomendaciones: number;
}> {
    return request('/admin/stats');
}

export async function updatePerfil(data: FormData): Promise<User> {
    return request<User>('/auth/perfil', {
        method: 'PUT',
        body: data,
    });
}
