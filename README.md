# Invitación XV años · Heisy Jireh

Invitación web animada con temática de Alicia en el País de las Maravillas, en azul rey y dorado.

**Enlace:** https://luisozuna853-star.github.io/heisyxvinvitacion/

## Estructura

```
index.html              Página principal (contenido y dibujos SVG)
css/estilos.css         Estilos y diseño responsive
js/config.js            Datos de la fiesta (lo único que normalmente se edita)
js/app.js               Animaciones, cuenta regresiva, firma y envío por WhatsApp
img/flores/             Flores en acuarela (.webp)
img/portada.jpg         Imagen que aparece al compartir el enlace por WhatsApp
img/icono-*.png         Íconos de la pestaña y del teléfono
manifest.webmanifest    Datos para guardar la invitación en la pantalla del teléfono
```

## Editar los datos

Abre `js/config.js` y cambia nombre, padres, fecha, hora, dirección, WhatsApp o el enlace de regalos.

- `fechaISO` controla la cuenta regresiva (formato `AAAA-MM-DDTHH:MM:SS`).
- `whatsapp` va con código de país y sin espacios, por ejemplo `18097793294`.
- Si cambias el enlace de regalos, hay que regenerar el código QR que está dentro de `index.html`.

Si cambias el nombre o la fecha, actualiza también las etiquetas `og:` del `<head>` en `index.html` y la imagen `img/portada.jpg`.

## Probar en la computadora

Ábrela con un servidor local (por ejemplo **Live Server** en VS Code). Si abres `index.html` con doble clic, el navegador bloquea la creación de la tarjeta firmada.

## Publicar con GitHub Pages

Settings → Pages → Deploy from a branch → rama `main`, carpeta `/ (root)`.

## Créditos técnicos

- Animaciones: [GSAP](https://gsap.com) 3.12.5 (ScrollTrigger y MotionPathPlugin) desde cdnjs.
- Tipografías: Pinyon Script y Cormorant Garamond desde Google Fonts.
