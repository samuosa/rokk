#!/usr/bin/env python3
"""Generate the favicon set + Open Graph image from the ROKK brand artwork.

Manual, occasional tool — NOT part of `npm run build`. The outputs are
committed to public/. Re-run only when the brand mark changes:

    pip install Pillow && python3 scripts/generate-favicons.py

The icon is the circle-A from src/assets/rokk-logo.jpeg — the logo's
signature glyph. The full "ROKK" wordmark is unreadable at 16px, and the
circle-A is the one element that survives the downscale. Its proportions
here are measured from the artwork (ring spans x 315..580, y 375..640 of
the 1024px original, so a diameter of ~265px with a ~25px stroke).
"""
import json

from PIL import Image, ImageDraw
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
LOGO = ROOT / "src" / "assets" / "rokk-logo.jpeg"

INK = (0, 0, 0)
PAPER = (249, 249, 249)  # $background in src/styles/_tokens.scss

# Geometry on a 64x64 canvas. Kept in one place so the SVG and the raster
# renderer below cannot drift apart.
BOX = 64.0
RING = dict(cx=32.0, cy=33.0, r=22.5, w=5.0)
APEX = (32.0, 8.5)            # breaks the top of the ring, as in the logo
FOOT_L, FOOT_R = (19.0, 53.0), (45.0, 53.0)
BAR_L, BAR_R = (6.0, 39.0), (58.0, 36.0)   # punches through the ring both sides
LEG_W, BAR_W = 5.2, 4.4


def svg() -> str:
    """Vector icon. Inverts on dark tab bars via prefers-color-scheme."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="ROKK">
  <style>
    .mark {{ stroke: #000; }}
    @media (prefers-color-scheme: dark) {{ .mark {{ stroke: #f9f9f9; }} }}
  </style>
  <g class="mark" fill="none" stroke-linecap="butt">
    <circle cx="{RING['cx']}" cy="{RING['cy']}" r="{RING['r']}" stroke-width="{RING['w']}"/>
    <path d="M{APEX[0]} {APEX[1]} L{FOOT_L[0]} {FOOT_L[1]} M{APEX[0]} {APEX[1]} L{FOOT_R[0]} {FOOT_R[1]}" stroke-width="{LEG_W}"/>
    <path d="M{BAR_L[0]} {BAR_L[1]} L{BAR_R[0]} {BAR_R[1]}" stroke-width="{BAR_W}"/>
  </g>
</svg>
"""


def raster(size: int, bg, pad: float = 0.0) -> Image.Image:
    """Draw the same geometry with PIL, supersampled 8x for clean edges.

    `pad` shrinks the mark toward the centre (0.1 = 10% inset), used for the
    maskable Android icon whose outer 10% may be cropped to a circle.
    """
    SS = 8
    n = size * SS
    img = Image.new("RGBA", (n, n), bg if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    scale = n / BOX * (1.0 - 2 * pad)
    off = n * pad

    def P(p):
        return (p[0] * scale + off, p[1] * scale + off)

    def W(w):
        return max(1, round(w * scale))

    cx, cy, r = RING["cx"] * scale + off, RING["cy"] * scale + off, RING["r"] * scale
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=INK, width=W(RING["w"]))
    d.line([P(APEX), P(FOOT_L)], fill=INK, width=W(LEG_W))
    d.line([P(APEX), P(FOOT_R)], fill=INK, width=W(LEG_W))
    d.line([P(BAR_L), P(BAR_R)], fill=INK, width=W(BAR_W))
    return img.resize((size, size), Image.LANCZOS)


def og_image() -> Image.Image:
    """1200x630 social card: the real logo artwork, texture intact, on brand paper."""
    card = Image.new("RGB", (1200, 630), PAPER)
    logo = Image.open(LOGO).convert("RGB")
    # The artwork's own ink bounding box, so the mark is optically centred
    # rather than centred on its whitespace.
    box = logo.convert("L").point(lambda v: 255 if v < 110 else 0).getbbox()
    logo = logo.crop(box)
    h = 470
    w = round(logo.size[0] * h / logo.size[1])
    if w > 1080:
        w, h = 1080, round(logo.size[1] * 1080 / logo.size[0])
    card.paste(logo.resize((w, h), Image.LANCZOS), ((1200 - w) // 2, (630 - h) // 2))
    return card


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)
    (PUBLIC / "favicon.svg").write_text(svg())

    # Legacy .ico: opaque paper background, or the black mark vanishes on a
    # dark tab bar (unlike the SVG above, an .ico cannot adapt).
    ico = raster(64, PAPER + (255,))
    ico.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # iOS ignores transparency and composites on black, so bake the paper in.
    raster(180, PAPER + (255,)).convert("RGB").save(PUBLIC / "apple-touch-icon.png")

    raster(192, PAPER + (255,)).convert("RGB").save(PUBLIC / "icon-192.png")
    raster(512, PAPER + (255,)).convert("RGB").save(PUBLIC / "icon-512.png")
    raster(512, PAPER + (255,), pad=0.10).convert("RGB").save(PUBLIC / "icon-512-maskable.png")

    og_image().save(PUBLIC / "og-image.jpg", quality=88, optimize=True)

    # Every path here is relative to the manifest's own URL, so the same file
    # works whether the site is served from "/" or from "/<repo>/".
    (PUBLIC / "site.webmanifest").write_text(json.dumps({
        "name": "PUNK X TEKK — ROKK",
        "short_name": "ROKK",
        "start_url": "./",
        "scope": "./",
        "display": "standalone",
        "background_color": "#f9f9f9",
        "theme_color": "#000000",
        "icons": [
            {"src": "./icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "./icon-512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "./icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
    }, indent=2) + "\n")

    for f in sorted(PUBLIC.iterdir()):
        print(f"  {f.name:28} {f.stat().st_size:>8,} B")


if __name__ == "__main__":
    main()
