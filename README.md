# lolavalle.com

Web del despacho de **Lola Valle Garrido**, abogada penalista en Madrid: [lolavalle.com](https://lolavalle.com).

Es un sitio estático: HTML, CSS y JavaScript sin framework ni paso de build. Usa [Bootstrap 5.3](https://getbootstrap.com/)
desde CDN y se publica con GitHub Pages.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.html` | La web, en una sola página con scroll: contenido, SEO (`canonical`, JSON-LD) y formulario de contacto. |
| `form-success.html` | Página de agradecimiento a la que se redirige tras enviar el formulario. |
| `css/style.css` | Estilos propios. Los colores están como variables al principio del fichero (`:root`). |
| `js/main.js` | Menú móvil y envío del formulario. |
| `images/` | Imágenes (`header.jpg` es la foto de la portada). |
| `CNAME` | Dominio personalizado. No borrarlo: sin él, el dominio deja de servir la web. |
| `.github/workflows/static.yml` | Despliegue a GitHub Pages. |

## Probar en local

No hace falta instalar nada. Hay dos formas:

1. **Abrir el fichero:** doble clic en `index.html` (o arrastrarlo al navegador). Vale para revisar textos y diseño.
2. **Servidor local** (recomendado, se comporta como la web publicada):

   ```sh
   python -m http.server 8000
   ```

   y abrir <http://localhost:8000>. Sirve cualquier servidor estático; con Node, `npx serve` también funciona.

Qué comprobar antes de subir un cambio:

- Que se ve bien en escritorio y en móvil (en el navegador, herramientas de desarrollo → vista de dispositivo).
- Que el menú y los enlaces de la barra llevan a su sección.
- Que no hay errores en la consola del navegador.

Limitaciones en local:

- El **formulario** envía a un servicio externo (Formspree). Desde `file://` el navegador puede bloquear la petición, y
  si se envía de verdad llega un mensaje real al despacho. Para probarlo, mejor hacerlo ya publicado.
- La **analítica** no registra nada en local y, si no carga, la web funciona igual.
- Bootstrap y los reproductores de audio vienen de internet: hace falta conexión para verlos.

## Publicación

Cada **push a `main` publica la web** (workflow «Deploy static content to Pages», con GitHub Actions). El workflow
publica el repositorio entero, así que **todo lo que se suba queda público**: no añadir notas internas, credenciales ni
ficheros de trabajo.

Flujo recomendado:

1. Crear una rama (`feat/...`, `fix/...`, `docs/...`).
2. Probar en local.
3. Abrir una Pull Request y combinarla en `main`. Al combinar se publica sola; tarda un par de minutos en verse.

## Cosas a tener en cuenta

- **SEO:** mantener el `title`, la `description`, el `canonical` y el JSON-LD de `index.html`, y los textos alternativos
  de las imágenes. La URL canónica es `https://lolavalle.com`.
- **Datos de contacto:** el teléfono, el correo y la dirección aparecen en varios sitios de `index.html` (contacto, pie y
  JSON-LD) y en `form-success.html`. Si cambian, actualizarlos en todos.
- **Formulario:** el `action` de `#contactForm` apunta al endpoint de Formspree. No cambiarlo sin avisar, porque los
  mensajes llegan a esa cuenta.
- **Dominio:** el dominio se configura con el fichero `CNAME` y los registros DNS del proveedor.
