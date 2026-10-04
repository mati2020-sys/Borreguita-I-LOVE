# Sistema de Diseño Visual Kawaii & Pastel Style (Sanrio Aesthetic)

Este documento detalla las reglas formales de color, tipografía, sombreado, animación y composición para construir interfaces web ultra-tiernas, limpias y visualmente pulidas al estilo de marcas como Sanrio (Hello Kitty, My Melody, Cinnamoroll, Pompompurin, Pochacco).

---

## 1. Paleta Cromática Pastel

La clave de la estética Sanrio es la saturación suave y los contrastes amables. **Regla de oro: NUNCA utilizar negro puro (`#000000`) para textos ni contornos**. El negro rompe la armonía tierna; en su lugar, se usa siempre un marrón chocolate cálido (`#7a4a3a` o `#603b2c`).

### Variables CSS estándar:

```css
:root {
  /* Rosas */
  --pink: #ffd6e8;           /* Rosa nube base */
  --pink-2: #ffb8d4;         /* Rosa algodón de azúcar */
  --pink-strong: #ff7fae;    /* Rosa fresa para títulos y acentos */

  /* Amarillos */
  --yellow: #fff1b8;         /* Vainilla / Pudín (Pompompurin) */
  --yellow-2: #ffe17a;       /* Miel suave para botones activos */

  /* Azules */
  --blue: #cdebff;           /* Azul cielo pastel (Cinnamoroll) */
  --blue-2: #9fd6ff;         /* Azul marino dulce */

  /* Neutros y complementarios */
  --lilac: #e6dbff;          /* Lila lavanda (Kuromi suave) */
  --cream: #fff8f0;          /* Blanco crema cálido para hojas de papel */
  --brown: #7a4a3a;          /* Chocolate con leche para textos y bordes */

  /* Sombras y luces */
  --shadow-kawaii: 0 10px 30px rgba(255, 127, 174, 0.25);
  --shadow-card: 0 18px 40px rgba(122, 74, 58, 0.16);
  --border-white: 4px solid #ffffff;
}
```

---

## 2. Tipografías Google Fonts

Se combinan 3 familias tipográficas para dar versatilidad:

1. **Titulares e Interfaz (`Fredoka`)**:
   - URL: `family=Fredoka:wght@500;600;700`
   - Características: Glifos redondeados, trazos uniformes, transmite simpatía y calidez inmediata.
   - Efecto recomendado en títulos: Sombra de texto doble o triple:
     ```css
     text-shadow: 3px 3px 0 #ffffff, 5px 5px 0 var(--pink-2);
     ```

2. **Cuerpo de texto legible (`Nunito`)**:
   - URL: `family=Nunito:wght@400;600;700;800`
   - Características: Altura de la 'x' generosa, terminales redondeadas, perfecta para párrafos y descripciones sin fatiga visual.

3. **Cartas y Notas Manuscritas (`Caveat`)**:
   - URL: `family=Caveat:wght@500;700`
   - Características: Cursiva dulce, ángulo personal, simula haber sido escrita a mano con tinta rosa o marrón.

---

## 3. Composición y Fondos Vivos

Una página plana se siente estática. El estilo kawaii requiere micro-movimiento constante pero no invasivo:

### A. Capa de Fondo (Patrón de Lunares Polka-Dots)
```css
.bg-dots {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.85) 2px, transparent 2.5px);
  background-size: 26px 26px;
}
```

### B. Nubes Flotantes Cinemáticas
Nubes formadas mediante CSS puro con `border-radius: 50px` y pseudo-elementos `::before` y `::after` flotando suavemente a velocidades desfasadas (60s a 95s) con opacidades sutiles.

### C. Lluvia de Partículas Dulces (`#falling`)
Generador en JavaScript de elementos flotantes (`💖`, `🌸`, `⭐`, `💕`, `🎀`, `☁️`, `🍮`, `🐑`) que caen girando a distintas velocidades y tamaños mediante CSS `keyframes fall`.

### D. Personajes Esquinas Flotantes (`floaters`)
Personajes colocados en las 4 esquinas con animación de balanceo pendular suave:
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-18px) rotate(4deg); }
}
```
En pantallas móviles (`max-width: 700px`), ocultar los personajes secundarios para no tapar los botones ni el texto.

---

## 4. Botones tipo Caramelo / Píldora

Los botones deben lucir acolchados, masticables y apetecibles:
- `border-radius: 999px` (forma de píldora).
- Borde blanco grueso (`border: 3px solid #ffffff`).
- Sombra 3D inferior: `box-shadow: 0 6px 0 rgba(122, 74, 58, 0.18), 0 10px 20px rgba(255, 127, 174, 0.2);`
- En hover: Elevación `translateY(-3px) scale(1.04)`.
- En click activo: Depresión táctil `translateY(3px)` con reducción de la sombra inferior a `2px`.
