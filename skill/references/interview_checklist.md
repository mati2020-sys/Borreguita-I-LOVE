# Checklist de Entrevista y Descubrimiento Previo

Antes de escribir una sola línea de código para una web interactiva de pareja, regalo o cita, el asistente **DEBE** recopilar o verificar las siguientes variables críticas para garantizar una personalización al 100%.

---

## 1. Datos Personales y Tono Afectivo

- [ ] **Apodo o Nombre de la Pareja**: ¿Cómo se le llama con cariño? (Ej: *"Mi borreguita"*, *"Cielito"*, *"Bebé"*, *"Gordita"*).
- [ ] **Nombre o Firma del Emisor**: ¿Quién envía la sorpresa? (Ej: *"Matías"*, *"Tu osito"*).
- [ ] **Contexto o Estado Actual**: ¿Hay alguna circunstancia especial a mencionar? (Ej: ¿está resfriada o con dolor de garganta?, ¿es su cumpleaños?, ¿es un aniversario?, ¿necesita mimitos?).

---

## 2. Personajes, Mascotas y Estética

- [ ] **Personajes Favoritos**: ¿Qué personajes de Sanrio o anime le apasionan?
  - Opciones comunes: *Cinnamoroll, Pompompurin, Pochacco, My Melody, Kuromi, Hello Kitty, Keroppi, Badtz-Maru*.
- [ ] **Mascota Personalizada**: ¿Tiene un animalito representativo? (Ej: Una ovejita/borreguita blanca con bufanda rosa y tacita de té).
- [ ] **Imágenes Proporcionadas vs Generadas**: ¿El usuario tiene fotos o stickers propios para incluir, o debemos generarlos mediante IA y limpiarles el fondo?

---

## 3. Hoja de Ruta de la Cita (El Mapa)

- [ ] **Lugares Reales**: ¿Cuáles son las paradas de la cita y sus direcciones exactas?
  - *Parada 1 (Comida)*: Nombre y dirección (ej. Burger King en Calle Marcelo Usera 109).
  - *Parada 2 (Paseo / Actividad)*: Nombre y dirección (ej. Centro Comercial Plaza Río 2).
  - *Parada 3 (Postre / Café / Relax)*: Nombre y dirección (ej. Starbucks Avenida del Manzanares 210).
- [ ] **Notas y Subtextos Románticos**: Qué mensaje cariñoso poner en cada parada (ej. *"Comidita rica 🍟"*, *"A mirar ropita juntos 👗"*, *"Un chocolate caliente para tu garganta 🍫"*).

---

## 4. Dinámicas de los Botones Tramposos y Juegos

- [ ] **El Botón Fugitivo**: ¿Cuál es el botón que huye? (Ej: *"Comprar un iPhone 15 rosa"* o el botón *"No"*).
- [ ] **Mecánica de Escape**:
  - ¿Escape deslizante suave que cambia de frases graciosas?
  - ¿Teletransporte instantáneo estilo hacker con efecto glitch?
- [ ] **Recompensa por Atraparlo**: ¿Qué ocurre si logran atraparlo?
  - Opción A: Un agujero negro cósmico se lo traga con temblor de pantalla.
  - Opción B: Mensaje gracioso (*"Jajaja te pillé, estoy ahorrando 🐷💸"*).
  - Opción C: Ventana de diálogo secreta con un cupón de amor.

---

## 5. Captura y Entrega de Respuestas (La Carta)

- [ ] **Correo Electrónico de Notificación**: ¿A qué correo enviar el plan cuando la pareja escriba su carta? (Ej: `matiprueva2020@gmail.com` usando FormSubmit).
- [ ] **Plan B Offline / Móvil**: ¿Desea incluir una canasta fija con descarga de `carta.html` y botón para compartir directo a WhatsApp? (Altamente recomendado).

---

## 6. Banda Sonora (Música)

- [ ] **Audio de Fondo**: ¿Dispone el usuario de una pista musical en audio (`.mp3`) o enlace? (Ej: `Picnic_Under_Pastel_Skies.mp3`).
- [ ] **Comportamiento del Reproductor**: Debe arrancar en mute o pausado hasta la primera interacción del usuario (`pointerdown`) por políticas de autoplay de los navegadores modernos, con botón flotante para silenciar/pausar.
