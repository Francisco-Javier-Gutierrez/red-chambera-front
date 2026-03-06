# Contrato de API - La Red Chambera (Frontend a Backend)

Este documento detalla todas las rutas, métodos y el formato exacto de los datos que el **frontend** espera enviar y recibir. Es crucial que el **backend** respete estos modelos para que la integración funcione sin problemas.

> **Nota:** Todas las rutas expuestas asumen que están precedidas por la base URL (por defecto `http://localhost:3000/api`). Todas las peticiones protegidas envían el token JWT en el header: `Authorization: Bearer <token>`.

---

## 🔑 1. Autenticación (`/auth`)

### 1.1 Iniciar Sesión (Login)
- **Ruta:** `/auth/login`
- **Método:** `POST`
- **Qué envía el Front (JSON):**
  ```json
  {
    "whatsapp": "string",
    "password": "string"
  }
  ```
- **Qué espera recibir el Front (JSON):**
  ```json
  {
    "token": "string",
    "user": {
      "id": 1,
      "nombre": "string",
      "whatsapp": "string",
      "rol": "trabajador", // o "empleador" o "admin"
      "municipio": "string",
      "foto_perfil": "string", // Opcional
      "created_at": "string" // Fecha en ISO
    }
  }
  ```

### 1.2 Registro (Register)
- **Ruta:** `/auth/register`
- **Método:** `POST`
- **Qué envía el Front (JSON):**
  ```json
  {
    "nombre": "string",
    "whatsapp": "string",
    "password": "string",
    "rol": "trabajador", // o "empleador"
    "municipio": "string"
  }
  ```
- **Qué espera recibir el Front (JSON):**
  *(Igual que el Login)*
  ```json
  {
    "token": "string",
    "user": { ... }
  }
  ```

### 1.3 Obtener Usuario Actual (Me)
- **Ruta:** `/auth/me`
- **Método:** `GET`
- **Qué espera recibir el Front (JSON - Objeto User):**
  ```json
  {
    "id": 1,
    "nombre": "string",
    "whatsapp": "string",
    "rol": "trabajador",
    "municipio": "string",
    "foto_perfil": "string", // Opcional
    "created_at": "string",
    // Si es trabajador, puede incluir:
    "oficios": ["string"],
    "descripcion": "string",
    "disponibilidad": "string",
    // Si es empleador, puede incluir:
    "nombre_negocio": "string",
    "tipo_negocio": "string",
    "direccion": "string"
  }
  ```

### 1.4 Actualizar Perfil
- **Ruta:** `/auth/perfil`
- **Método:** `PUT`
- **Qué envía el Front (`multipart/form-data`):**
  *Se envía como un FormData porque puede incluir foto de perfil.*
- **Qué espera recibir el Front:**
  El objeto `User` actualizado (ver `1.3`).

---

## 💼 2. Vacantes (`/vacantes`)

### 2.1 Obtener Vacantes (con Paginación y Filtros)
- **Ruta:** `/vacantes`
- **Método:** `GET`
- **Filtros por Query Params (Todos opcionales):**
  `?municipio=...&tipo_trabajo=...&horario=...&page=1&limit=10`
- **Qué espera recibir el Front (JSON Paginado):**
  ```json
  {
    "data": [
      {
        "id": 1,
        "titulo": "string",
        "descripcion": "string",
        "tipo_trabajo": "string",
        "municipio": "string",
        "horario": "string",
        "pago": "string",
        "requisitos": "string", // Opcional
        "whatsapp_contacto": "string",
        "empleador_id": 1,
        "empleador": { ... }, // Objeto Empleador (Ver 1.3)
        "activa": true,
        "created_at": "string"
      }
    ],
    "total": 100,
    "page": 1,
    "totalPages": 10
  }
  ```

### 2.2 Obtener Una Vacante
- **Ruta:** `/vacantes/:id`
- **Método:** `GET`
- **Qué espera recibir el Front (JSON):**
  El objeto `Vacante` detallado (Ver bloque `data` de `2.1`).

### 2.3 Crear Vacante
- **Ruta:** `/vacantes`
- **Método:** `POST`
- **Qué envía el Front (JSON):**
  ```json
  {
    "titulo": "string",
    "descripcion": "string",
    "tipo_trabajo": "string",
    "municipio": "string",
    "horario": "string",
    "pago": "string",
    "requisitos": "string", // Opcional
    "whatsapp_contacto": "string"
  }
  ```
- **Qué espera recibir el Front (JSON):**
  El objeto `Vacante` recién creado.

### 2.4 Actualizar Vacante
- **Ruta:** `/vacantes/:id`
- **Método:** `PUT`
- **Qué envía el Front (JSON):**
  Cualquier campo del modelo Vacante (parcial).
- **Qué espera recibir el Front (JSON):**
  El objeto `Vacante` actualizado.

### 2.5 Eliminar Vacante
- **Ruta:** `/vacantes/:id`
- **Método:** `DELETE`
- **Qué espera recibir el Front:** Código de estado HTTP `200` o `204` (Sin contenido cuerpo necesario).

### 2.6 Ver Mis Vacantes (Como empleador)
- **Ruta:** `/vacantes/mis-vacantes`
- **Método:** `GET`
- **Qué espera recibir el Front:**
  Arreglo directo de objetos `Vacante`: `[ { ... }, { ... } ]`.

---

## 🛠️ 3. Fichas de Trabajo (`/fichas`)

### 3.1 Obtener Fichas
- **Ruta:** `/fichas` (Opcional query param: `?trabajador_id=1`)
- **Método:** `GET`
- **Qué espera recibir el Front (JSON - Arreglo de Fichas):**
  ```json
  [
    {
      "id": 1,
      "trabajador_id": 1,
      "titulo": "string",
      "descripcion": "string",
      "imagenes": ["url_img_1", "url_img_2"], // Array de URLs en string
      "tipo_trabajo": "string",
      "fecha_realizacion": "string", // Opcional
      "created_at": "string"
    }
  ]
  ```

### 3.2 Obtener Una Ficha
- **Ruta:** `/fichas/:id`
- **Método:** `GET`
- **Qué espera recibir el Front:** El objeto `FichaTrabajo` detallado.

### 3.3 Crear Ficha
- **Ruta:** `/fichas`
- **Método:** `POST`
- **Qué envía el Front (`multipart/form-data`):**
  - `titulo`: "string"
  - `descripcion`: "string"
  - `tipo_trabajo`: "string"
  - `fecha_realizacion`: "string" (Opcional)
  - `imagenes`: Archivos binarios (`File[]`). Nota: Se envían varias veces la key `imagenes` si hay múltiples archivos.
- **Qué espera recibir el Front:**
  El objeto `FichaTrabajo` recién creado (con los URLs de las imágenes ya procesadas).

### 3.4 Eliminar Ficha
- **Ruta:** `/fichas/:id`
- **Método:** `DELETE`
- **Qué espera recibir el Front:** Código de estado `200` o `204`.

---

## ⭐ 4. Recomendaciones (`/recomendaciones`)

### 4.1 Obtener Recomendaciones de un Trabajador
- **Ruta:** `/recomendaciones?trabajador_id=:id`
- **Método:** `GET`
- **Qué espera recibir el Front (JSON - Arreglo):**
  ```json
  [
    {
      "id": 1,
      "trabajador_id": 1,
      "autor_id": 2,
      "autor": { ... }, // Objeto User completo o resumido
      "comentario": "string",
      "puntuacion": 4, // Número del 1 al 5
      "created_at": "string"
    }
  ]
  ```

### 4.2 Crear Recomendación
- **Ruta:** `/recomendaciones`
- **Método:** `POST`
- **Qué envía el Front (JSON):**
  ```json
  {
    "trabajador_id": 1,
    "comentario": "string",
    "puntuacion": 5
  }
  ```
- **Qué espera recibir el Front:**
  El objeto `Recomendacion` recién creado.

---

## 📚 5. Contenido Educativo (`/educativo`)

### 5.1 Obtener Todos los Contenidos
- **Ruta:** `/educativo`
- **Método:** `GET`
- **Qué espera recibir el Front (JSON - Arreglo):**
  ```json
  [
    {
      "id": 1,
      "titulo": "string",
      "contenido": "string",
      "categoria": "string",
      "imagen": "string", // Opcional (URL)
      "created_at": "string"
    }
  ]
  ```

### 5.2 Obtener Un Contenido
- **Ruta:** `/educativo/:id`
- **Método:** `GET`
- **Qué espera recibir el Front:** El objeto `ContenidoEducativo`.

---

## 🛡️ 6. Administrador (`/admin`)

### 6.1 Obtener Usuarios
- **Ruta:** `/admin/usuarios`
- **Método:** `GET`
- **Qué espera recibir el Front:** `[ { ...User }, { ...User } ]`

### 6.2 Actualizar Usuario
- **Ruta:** `/admin/usuarios/:id`
- **Método:** `PUT`
- **Qué envía el Front (JSON):** Datos parciales de un usuario (`Partial<User>`).
- **Qué espera recibir el Front:** El objeto `User` modificado.

### 6.3 Eliminar Usuario
- **Ruta:** `/admin/usuarios/:id`
- **Método:** `DELETE`
- **Qué espera recibir el Front:** Código `200` o `204`.

### 6.4 Obtener Contenido General (Para Moderación)
- **Ruta:** `/admin/contenido`
- **Método:** `GET`
- **Qué espera recibir el Front:** Arreglo mixto de Vacantes o Fichas `(Vacante | FichaTrabajo)[]`.
 *(Nota: El backend debería mandar un indicativo de si es ficha o vacante, o el front identificará por las propiedades).*

### 6.5 Eliminar Contenido
- **Ruta:** `/admin/contenido/:tipo/:id` (donde `:tipo` es `"vacante"` o `"ficha"`)
- **Método:** `DELETE`
- **Qué espera recibir el Front:** Código `200` o `204`.

### 6.6 Obtener Estadísticas
- **Ruta:** `/admin/stats`
- **Método:** `GET`
- **Qué espera recibir el Front (JSON):**
  ```json
  {
    "totalUsuarios": 100,
    "totalVacantes": 50,
    "totalFichas": 30,
    "totalRecomendaciones": 120
  }
  ```
