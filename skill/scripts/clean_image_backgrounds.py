#!/usr/bin/env python3
"""
clean_image_backgrounds.py
===========================
Herramienta de procesamiento automático de imágenes para webs estilo Sanrio / Kawaii.
Elimina fondos blancos o monocromáticos mediante flood fill desde los bordes sin
afectar el interior del dibujo, recorta bordes sobrantes transparentes (autocrop)
y optimiza el tamaño para la web manteniendo calidad nítida.

Uso:
    python clean_image_backgrounds.py --input-dir ruta/a/imagenes --output-dir ruta/a/img --threshold 40
"""

import os
import sys
import argparse
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("[ERROR] Pillow no está instalado. Ejecuta: pip install Pillow")
    sys.exit(1)


def remove_background_and_crop(src_path: Path, dst_path: Path, threshold: int = 40, max_size: int = 600):
    """
    Convierte una imagen a RGBA, elimina el fondo comenzando por los bordes
    y esquinas (evitando borrar blancos dentro del personaje como dientes u ojos),
    recorta el cuadro delimitador (bounding box) y redimensiona manteniendo relación de aspecto.
    """
    try:
        im = Image.open(src_path).convert("RGBA")
        w, h = im.size

        # Puntos de semilla en los bordes y esquinas para el flood fill transparente
        seeds = [
            (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
            (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2),
            (w // 4, 0), (3 * w // 4, 0), (0, h // 4), (0, 3 * h // 4),
            (w - 1, h // 4), (w - 1, 3 * h // 4), (w // 4, h - 1), (3 * w // 4, h - 1)
        ]

        for pt in seeds:
            if pt[0] < w and pt[1] < h:
                pixel = im.getpixel(pt)
                # Si no es ya completamente transparente y es claro (cercano a blanco)
                if pixel[3] != 0 and (pixel[0] > 200 and pixel[1] > 200 and pixel[2] > 200):
                    ImageDraw.floodfill(im, pt, (255, 255, 255, 0), thresh=threshold)

        # Autocrop al contenido real
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)

        # Limitar tamaño máximo para optimizar carga web
        im.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

        dst_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst_path, "PNG", optimize=True)
        print(f"[OK] Procesada: {src_path.name} -> {dst_path.name} ({im.size[0]}x{im.size[1]}px)")
        return True
    except Exception as e:
        print(f"[FALLO] Error procesando {src_path.name}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Procesador de transparencia y recorte para activos Kawaii")
    parser.add_argument("--input", "-i", required=True, help="Archivo o directorio de origen")
    parser.add_argument("--output", "-o", required=True, help="Archivo o directorio de destino")
    parser.add_argument("--threshold", "-t", type=int, default=40, help="Tolerancia del flood fill (default: 40)")
    parser.add_argument("--max-size", "-s", type=int, default=600, help="Dimensión máxima en px (default: 600)")

    args = parser.parse_args()

    in_path = Path(args.input)
    out_path = Path(args.output)

    if in_path.is_file():
        remove_background_and_crop(in_path, out_path, args.threshold, args.max_size)
    elif in_path.is_dir():
        out_path.mkdir(parents=True, exist_ok=True)
        valid_exts = {".png", ".jpg", ".jpeg", ".webp"}
        files = [f for f in in_path.iterdir() if f.suffix.lower() in valid_exts]
        print(f"Encontradas {len(files)} imágenes en {in_path}...")
        for f in files:
            target = out_path / (f.stem + ".png")
            remove_background_and_crop(f, target, args.threshold, args.max_size)
    else:
        print(f"[ERROR] Ruta no encontrada: {in_path}")


if __name__ == "__main__":
    main()
