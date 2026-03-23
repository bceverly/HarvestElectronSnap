#!/usr/bin/env python3
"""Generate PNG icon sizes from the Harvest logo."""
from PIL import Image

img = Image.open("icons/harvest-original.png").convert("RGBA")
for size in [16, 32, 48, 64, 128, 256, 512]:
    resized = img.resize((size, size), Image.LANCZOS)
    resized.save(f"icons/{size}x{size}.png")
    print(f"Generated icons/{size}x{size}.png")
