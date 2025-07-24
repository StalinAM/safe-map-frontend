# Safe Map Frontend

Safe Map es una aplicación web para visualizar, registrar y administrar lugares seguros, horarios y eventos en un mapa interactivo. El frontend está construido con **Astro** y **React**, usando Zustand para la gestión de estado y Leaflet para los mapas.

---

## 🚀 Funcionalidades principales

### 1. Mapa interactivo

- Visualización de todos los lugares registrados en el mapa.
- Marcadores con información de cada lugar (nombre, descripción, calificación).
- Centrado automático en el lugar seleccionado.
- Filtrado por lugares seguros.

### 2. Gestión de lugares

- Listado de todos los lugares registrados.
- Filtro por día y hora (según horarios).
- Filtro por tipo de evento (positivo, negativo, neutral).
- Visualización de detalles, calificaciones y eventos de cada lugar.
- **Usuarios autenticados** pueden agregar nuevos lugares seleccionando la ubicación en el mapa o usando su ubicación actual.
- **Administradores** pueden editar y eliminar lugares desde el dashboard.

### 3. Horarios de lugares

- Cada lugar puede tener uno o varios horarios asociados.
- Filtro de lugares por disponibilidad según día y hora.
- **Dashboard admin** para crear, editar y eliminar horarios.
- Selección de lugar al crear/editar horario (desplegable con todos los lugares).

### 4. Eventos

- Visualización de eventos asociados a cada lugar.
- Filtro por tipo de evento (positivo, negativo, neutral).
- Creación de eventos (fecha, título, tipo, descripción) por usuarios autenticados.
- **Dashboard admin** para gestionar todos los eventos.

### 5. Calificaciones

- Visualización de calificaciones de cada lugar.
- Los usuarios pueden calificar un lugar solo una vez.
- Modal para ver todas las calificaciones.

### 6. Autenticación y roles

- Registro y login de usuarios.
- Selección de rol al registrarse (Usuario o Administrador).
- Persistencia de sesión con JWT y localStorage.
- Acceso restringido al dashboard admin solo para usuarios con rol `ADMIN`.

### 7. Dashboard de administración

- Panel exclusivo para administradores (`/admin`).
- Tabs para gestionar lugares, horarios y eventos.
- Formularios modales para crear y editar entidades.
- Eliminación de lugares, horarios y eventos con confirmación.

---

## 🗂 Estructura del proyecto

```
src/
  assets/           Imágenes y SVGs
  components/       Componentes React (mapa, formularios, modales, dashboard)
  layouts/          Layouts Astro
  pages/            Páginas Astro (index, login, register, admin)
  store/            Zustand stores (lugares, horarios, eventos, auth, ratings)
  styles/           Archivos CSS globales
```

---

## 🧑‍💻 Tecnologías usadas

- **Astro**: Framework principal para SSR y estructura de páginas.
- **React**: Componentes interactivos y modales.
- **Zustand**: Gestión global de estado.
- **Leaflet + react-leaflet**: Mapas y marcadores.
- **TailwindCSS**: Estilos y diseño responsivo.
- **Fetch API**: Comunicación con el backend REST.

---

## ⚙️ Instalación y ejecución

1. Instala dependencias:
   ```sh
   npm install
   ```
2. Ejecuta el servidor de desarrollo:
   ```sh
   npm run dev
   ```
3. Accede a [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 📝 Uso rápido

- **Registro:** Crea una cuenta y selecciona tu rol (Usuario o Administrador).
- **Login:** Inicia sesión para acceder a funcionalidades avanzadas.
- **Mapa:** Explora lugares, filtra por horarios y eventos.
- **Dashboard admin:** Accede a `/admin` si eres administrador para gestionar toda la información.

---

## 🔒 Seguridad y roles

- El dashboard solo es accesible para administradores.
- Los usuarios solo pueden agregar lugares y eventos, no modificarlos ni eliminarlos.
- Los datos sensibles se almacenan en localStorage y cookies.

---

## 📦 Comandos útiles

| Comando           | Acción                           |
| ----------------- | -------------------------------- |
| `npm install`     | Instala dependencias             |
| `npm run dev`     | Inicia el servidor de desarrollo |
| `npm run build`   | Compila el sitio para producción |
| `npm run preview` | Previsualiza el sitio compilado  |

---

## 📚 Documentación y soporte

- [Astro Docs](https://docs.astro.build)
- [React Docs](https://react.dev/)
- [Leaflet Docs](https://leafletjs.com/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 💡 Contribuciones

Si deseas mejorar el proyecto, ¡haz un fork y envía tu PR!

---

## 🏷️ Licencia

Este proyecto es open source y puedes usarlo libremente.

---
