# Portafolio · Sahar Chain

Portafolio personal de Sahar Gabriela Chain Mayorga: programadora, diseñadora y desarrolladora web.

## Pestañas

| Página | Contenido |
| --- | --- |
| `index.html` | Inicio: orbe con AURA, los 4 pilares y proyectos destacados |
| `sobre-mi.html` | Perfil con foto, trayectoria y habilidades |
| `proyectos.html` | Bóveda holográfica: informe de misión + carrusel 3D. Acepta `?area=code|ai|design|marketing` y `?p=<id>`. Los datos salen de `projects` en `js/aura/knowledge.js` |
| `servicios.html` | Consola "Diseña tu misión" (3 pasos → plan con servicios recomendados) y catálogo. Los servicios están en `js/services-data.js` |
| `contacto.html` | Formulario (Formspree), WhatsApp, correo y redes. El código de Formspree va en `js/contact.js` |

### Páginas de cada proyecto
`Zohar.html`, `oden.html`, `metaltec.html`, `unicos.html`, `little-stars.html`, `sports-store.html` y `sell-services.html` se generan con `tools/cases.py`. Cada una tiene los colores, la tipografía y un motivo animado propio de su marca. Para cambiar textos, imágenes o colores, edita los datos en ese archivo y ejecuta:

```
python3 tools/cases.py
```

Las imágenes optimizadas están en `img/cases/`.

La barra de navegación, el pie de página y el orbe flotante de AURA se generan desde `js/site.js`, así que solo hay que editarlos en un lugar. Los comentarios que AURA hace en cada pestaña están en `pages` dentro de `js/aura/knowledge.js`.

## Home holográfico con AURA

La primera pantalla es un "sistema" de ciencia ficción: un orbe 3D (WebGL) con **AURA**, una asistente que da la bienvenida, narra lo que hay en el sitio y responde preguntas en español e inglés.

| Archivo | Para qué sirve |
| --- | --- |
| `js/aura/knowledge.js` | **Todo lo que sabe AURA**: nombre, bienvenida, respuestas, proyectos y tecnologías. Edita aquí para cambiar textos. |
| `js/aura/assistant.js` | Chat, efecto de escritura, voz, micrófono, idioma y navegación. |
| `js/aura/orb.js` | Orbe 3D (Three.js): partículas, anillos, plataforma y reacciones (habla, piensa, escucha). |
| `js/aura/hud.js` | Paneles decorativos, reloj, menú móvil. |
| `css/aura.css` | Estilos del home (paleta esmeralda + violeta + magenta). |
| `js/site.js` · `css/site.css` | Navegación, pie de página y orbe flotante compartidos por todas las pestañas. |
| `js/bg.js` | Fondo de partículas animado de las pestañas internas (usa `--fx-a` y `--fx-b` del `<body>`). |
| `css/case.css` · `js/case.js` | Plantilla de las páginas de proyecto: visor de imágenes y paleta para copiar colores. |
| `js/vendor/three.min.js` | Three.js r149 incluido localmente (no depende de un CDN). |

### Cambiar el nombre del asistente
En `js/aura/knowledge.js` cambia `config.name`. En `index.html` busca `AURA` para cambiar las etiquetas fijas.

### Agregar una respuesta
Agrega un objeto a `intents` con `keys` (palabras que la activan, sin tildes), `answer` (`es` / `en`) y, si quieres, `action` para llevar al usuario a una sección.

### Conectar una IA real (más adelante)
Pon la URL de un endpoint en `config.aiEndpoint`. Si AURA no encuentra respuesta local, enviará `POST { message, lang, history }` y espera `{ reply }`.

## Ver el sitio en local
Abre `index.html` en el navegador, o sirve la carpeta con `python3 -m http.server` y entra a `http://localhost:8000`.
