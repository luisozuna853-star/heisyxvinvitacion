# Invitación XV años · Heisy Jireh

Invitación web animada con temática de Alicia en el País de las Maravillas (azul rey y dorado).

## Qué incluye
- Sobre animado con péndulo, mariposas y sello de cera que se abre.
- Portada con los XV, nombre y frase.
- Fecha, hora, dirección, cuenta regresiva, botón de calendario y "Cómo llegar".
- Confirmación de asistencia con firma y envío por WhatsApp.
- QR y botón al listado de regalos.

## Cómo editar los datos
Abre `index.html`, busca el bloque `const CONFIG = {` y cambia lo necesario:
nombre, padres, fecha, fechaISO (cuenta regresiva), hora, dirección, número de WhatsApp y enlace de regalos.

> Si cambias el enlace de regalos, el código QR hay que regenerarlo (el actual apunta a la lista de MyRegistry).

## Publicar con GitHub Pages
1. Sube estos archivos a un repositorio.
2. En el repositorio: **Settings → Pages**.
3. En "Build and deployment", elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En uno o dos minutos la invitación queda en https://luisozuna853-star.github.io/heisyxvinvitacion/

## Vista previa al compartir el enlace
`portada.jpg` es la imagen que aparece cuando se manda el enlace por WhatsApp.
Enlace de la invitación: https://luisozuna853-star.github.io/heisyxvinvitacion/

## Notas
- Es un solo archivo: estilos, código e imágenes van dentro de `index.html`.
- Las animaciones usan GSAP desde cdnjs y las fuentes desde Google Fonts, así que necesita internet.
