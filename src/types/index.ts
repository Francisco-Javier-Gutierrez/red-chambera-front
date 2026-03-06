// ========================
// La Red Chambera — Types
// ========================

export type Rol = 'trabajador' | 'empleador' | 'admin';

export interface User {
  id: number;
  nombre: string;
  whatsapp: string;
  rol: Rol;
  municipio: string;
  foto_perfil?: string;
  oficios?: string[];
  descripcion?: string;
  disponibilidad?: string;
  nombre_negocio?: string;
  tipo_negocio?: string;
  direccion?: string;
  created_at: string;
}

export interface Trabajador extends User {
  rol: 'trabajador';
  oficios: string[];
  descripcion?: string;
  disponibilidad?: string;
}

export interface Empleador extends User {
  rol: 'empleador';
  nombre_negocio?: string;
  tipo_negocio?: string;
  direccion?: string;
}

export interface Vacante {
  id: number;
  titulo: string;
  descripcion: string;
  tipo_trabajo: string;
  municipio: string;
  horario: string;
  pago: string;
  requisitos?: string;
  whatsapp_contacto: string;
  empleador_id: number;
  empleador?: Empleador;
  activa: boolean;
  tipo_registro: 'vacante' | 'trabajador';
  created_at: string;
}

export interface FichaTrabajo {
  id: number;
  trabajador_id: number;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  tipo_trabajo: string;
  fecha_realizacion?: string;
  trabajador?: User;
  created_at: string;
}

export interface Recomendacion {
  id: number;
  trabajador_id: number;
  autor_id: number;
  autor?: User;
  comentario: string;
  puntuacion: number; // 1-5
  created_at: string;
}

export interface ContenidoEducativo {
  id: number;
  titulo: string;
  contenido: string;
  categoria: string;
  imagen?: string;
  created_at: string;
}

// ========================
// Request / Response DTOs
// ========================

export interface LoginRequest {
  whatsapp: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  whatsapp: string;
  password: string;
  rol: 'trabajador' | 'empleador';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface VacanteFilters {
  tipo_trabajo?: string;
  horario?: string;
  tipo_registro?: 'vacante' | 'trabajador';
  page?: number;
  limit?: number;
}

export interface CreateVacanteRequest {
  titulo: string;
  descripcion: string;
  tipo_trabajo: string;
  horario: string;
  pago: string;
  requisitos?: string;
  whatsapp_contacto: string;
  tipo_registro?: 'vacante' | 'trabajador';
}

export interface CreateFichaRequest {
  titulo: string;
  descripcion: string;
  tipo_trabajo: string;
  fecha_realizacion?: string;
  imagenes?: File[];
}

export interface CreateRecomendacionRequest {
  trabajador_id: number;
  comentario: string;
  puntuacion: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
