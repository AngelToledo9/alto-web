# ALTO – Soluciones Tecnológicas
### Sitio web oficial · Puerto Montt, Región de Los Lagos

---

## 📁 Estructura del proyecto

```
alto-web/
├── index.html          ← Página principal (toda la estructura HTML)
├── css/
│   ├── reset.css       ← Normalización base
│   ├── variables.css   ← Colores, fuentes, espaciados (design tokens)
│   ├── layout.css      ← Navbar, Hero, Stats, Footer
│   ├── components.css  ← Botones, tarjetas, formulario, tags
│   ├── sections.css    ← Servicios, Nosotros, Proceso, Trabajos, Contacto
│   └── responsive.css  ← Breakpoints móvil y tablet
├── js/
│   └── main.js         ← Menú, scroll activo, animaciones, formulario
├── img/
│   └── logo.png        ← Logo principal de ALTO
└── README.md           ← Este archivo
```

---

## 🚀 Cómo usar en VS Code

1. Abre la carpeta `alto-web/` en VS Code  
   `Archivo → Abrir carpeta…`

2. Instala la extensión **Live Server** (si no la tienes)  
   Busca `Live Server` en el panel de extensiones

3. Haz clic derecho en `index.html` → **Open with Live Server**

4. El sitio abre en `http://127.0.0.1:5500`

---

## ✏️ Personalización rápida

### Cambiar número de WhatsApp
Busca `56900000000` en:
- `index.html` (botón WhatsApp en contacto)
- `js/main.js` (línea `const waNumber = '56900000000'`)

Reemplaza con tu número sin `+` ni espacios. Ejemplo: `56912345678`

### Cambiar email y teléfono
Busca en `index.html`:
- `contacto@altosoluciones.cl` → tu email real
- `+56 9 XXXX XXXX` → tu número real
- `@alto.soluciones` → tus redes sociales reales

### Agregar fotos de trabajos
Las tarjetas de portafolio están en `index.html` (sección `#trabajos`).  
Para agregar una foto real, en `css/sections.css` cambia el gradiente por:

```css
.work-card--1 {
  background-image: url('../img/trabajo1.jpg');
  background-size: cover;
  background-position: center;
}
```

### Cambiar colores
Todos los colores están en `css/variables.css`.  
Modifica las variables `:root` y los cambios se aplican a todo el sitio.

---

## 🌐 Para subir a internet

El sitio es HTML/CSS/JS puro, sin dependencias.  
Puedes subirlo a cualquier hosting:
- **GitHub Pages** (gratis)
- **Netlify** (gratis, arrastra la carpeta)
- **Hostinger / Namecheap** (hosting compartido)

---

## 📌 Pendientes antes de publicar

- [ ] Reemplazar número de WhatsApp real
- [ ] Reemplazar email real
- [ ] Reemplazar redes sociales reales
- [ ] Agregar fotos reales de trabajos en `img/`
- [ ] Configurar dominio (ej: `altosoluciones.cl`)
- [ ] Conectar formulario a backend o servicio de email (EmailJS, Formspree, etc.)

---

*Desarrollado para ALTO Soluciones Tecnológicas · 2025*
