# Mecánicas Interactivas y Lúdicas (Gamification Guide)

Este documento contiene los algoritmos y patrones de implementación para las mecánicas más divertidas de la web interactiva.

---

## 1. Botón Fugitivo con Fatiga y Detección Táctil

### El Problema
Si un botón huye indefinidamente sin posibilidad de ser alcanzado, el usuario puede frustrarse. Si huye de manera tosca, parpadea o se sale de la pantalla visible.

### La Solución Técnica
1. **Detección Euclidiana de Cercanía**: Se calcula la distancia euclidiana entre el cursor y el centro del botón.
   ```javascript
   const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
   if (d < Math.max(r.width, r.height) / 2 + 60) fleeIphone();
   ```
2. **Posición Fija sin Salto Brusco**: Antes del primer salto, se congela su posición absoluta en `fixed` con coordenadas reales (`getBoundingClientRect`) para que la transición sea fluida.
3. **Mecánica de Fatiga Opcional**:
   Tras varios escapes (ej. 7 saltos), existe una probabilidad de que el botón se "canse" durante 1.5 segundos mostrando un mensaje como *"Uff… me canso 😮‍💨"*, abriendo una ventana justa para que el usuario logre atraparlo.
4. **Soporte Táctil en Móviles**:
   Escuchar `touchstart` con `{ passive: false }` y llamar a `e.preventDefault()` antes de ejecutar el salto, para evitar que el dedo active el click instantáneamente si no está cansado.

---

## 2. Evento del Agujero Negro (Vórtice Cósmico)

Cuando el usuario logra atrapar el botón tramposo, se dispara la recompensa cósmica:
1. **Creación del Vórtice**: Se inyecta un `div.blackhole` centrado en el botón con degradado radial y cónico giratorio:
   ```css
   .blackhole {
     position: fixed; border-radius: 50%; z-index: 200; pointer-events: none;
     background: radial-gradient(circle, #000 35%, #2a0b3d 55%, rgba(170, 90, 255, .7) 68%, transparent 80%);
     box-shadow: 0 0 40px 15px rgba(140, 60, 220, .55);
     animation: holeLife 2.6s ease-in-out forwards;
   }
   ```
2. **Animación del Botón Siendo Absorbido (`swallowed`)**:
   El botón rota 900 grados mientras se reduce a escala 0 y se desenfoca.
3. **Temblor Sísmico de Pantalla (`screen-shake`)**:
   La clase `screen-shake` en el `body` produce oscilaciones de 5px durante 0.5s.
4. **Reemplazo del Slot**: El botón desaparecido es reemplazado en el DOM por un mensaje humorístico.

---

## 3. Botón Hacker con Teletransporte Glitch

En lugar de deslizarse, el botón "No" se descompone digitalmente como un hacker:
1. **Efecto Glitch Out**: Mediante `clip-path: inset(...)` y `filter: drop-shadow(...)` verde cian, el botón se corta en franjas y desaparece en 180ms.
2. **Etiqueta flotante estilo Terminal**: Aparece flotando en pantalla verde neón `#19ff7a` sobre fondo negro un mensaje aleatorio:
   - `ACCESS DENIED`
   - `404: "No" not found`
   - `sudo say yes`
   - `firewall: amor`
3. **Reaparición Glitch In**: En una coordenada aleatoria segura, el botón reaparece recomponiéndose en 250ms.

---

## 4. Carta Mágica que se Sacude y Despliega

1. **Estado Inicial**: Se muestra un sobre cerrado flotando con lazo y sello de corazón.
2. **Animación Shake**: Al hacer click, el sobre vibra fuertemente de lado a lado con una curva bezier elástica (`cubic-bezier(.36, .07, .19, .97)`).
3. **Desaparición del Sobre y Entrada de la Hoja**: El sobre se disuelve hacia abajo y la hoja de libreta sube desde abajo (`sheetUp`) simulando emerger con renglones de color rosa y corazones en el margen izquierdo (`♡ ♡ ♡`).
4. **Textarea Autoexpandible**:
   ```javascript
   textIn.addEventListener('input', () => {
     textIn.style.height = 'auto';
     textIn.style.height = Math.max(111, textIn.scrollHeight) + 'px';
   });
   ```

---

## 5. Vuelo Cinemático hacia la Canasta y Entrega Dual

Al presionar "Guardar plan":
1. **Animación de Vuelo (`flyToBasket`)**: Se clona un sobrecito que parte de la posición del botón y viaja en trayectoria curva con `transform: scale(.4) rotate(360deg)` hacia la canasta en la esquina superior derecha.
2. **Efecto Bump en la Canasta**: La canasta hace un bote alegre (`animation: bump .6s`) y el contador badge sube +1.
3. **Doble Vía de Entrega**:
   - **Vía 1: Envío Transparente AJAX (FormSubmit)**:
     Si la web corre sobre HTTP/HTTPS, envía un POST JSON silencioso a `https://formsubmit.co/ajax/TU_CORREO`.
   - **Vía 2: Almacenamiento Local + Descarga / WhatsApp**:
     Se almacena el plan en `localStorage` y en la canasta se ofrece:
     - **Descarga `carta.html`**: Construida al vuelo mediante un objeto `Blob` con HTML autocontenido de estilo carta vintage kawaii.
     - **Botón WhatsApp**: En dispositivos móviles compatibles, activa la Web Share API (`navigator.share({ files: [file] })`) permitiendo seleccionar WhatsApp directamente.

---

## 6. Mapa Interactivo de la Cita (Leaflet.js)

1. **Integración OpenStreetMap**: Usa Leaflet sin requerir claves de API complejas.
2. **Pines Cute Personalizados (`L.divIcon`)**:
   Pines SVG/HTML con forma de lágrima girada en ángulo de 45° en colores pastel temáticos (ej. amarillo para comida, rosa para compras, azul para café).
3. **Ruta con Línea Rosa Discontinua**: `L.polyline` con `color: '#ff7fae', dashArray: '2 12'`.
4. **Interconexión con Tarjetas de Pasos**: Al pulsar cada tarjeta, el mapa vuela suavemente (`map.flyTo`) a las coordenadas del lugar y abre el popup informativo.

---

## 7. Confeti de Corazones en Canvas

Una animación ultra ligera sobre `<canvas id="confetti">` con partículas de dos tipos: rectángulos pastel y corazones dibujados con curvas de Bézier cúbicas (`bezierCurveTo`), con física de gravedad, dispersión inicial y rotación angular.
