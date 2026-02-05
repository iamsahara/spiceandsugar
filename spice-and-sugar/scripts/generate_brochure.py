import os
from reportlab.lib.pagesizes import A5
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output", "pdf")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "velora-menu-a5.pdf")

LOGO_PATH = os.path.join(BASE_DIR, "public", "veloralogo.png")
FEATURE_IMAGES = [
    os.path.join(BASE_DIR, "public", "output.jpg"),
    os.path.join(BASE_DIR, "public", "output (1).jpg"),
]

MENU_ITEMS = [
    ("Velora Signature", 38.00),
    ("Floral Buttercream", 32.00),
    ("Golden Berry", 36.00),
    ("Modern Romance", 40.00),
    ("Classic White", 28.00),
    ("Blush Rose", 30.00),
    ("Citrus Bloom", 34.00),
    ("Luxe Garden", 36.00),
]

CONTACT_LINES = [
    "Phone: 1-647-379-8489",
    "Instagram: @velora_bakery",
    "Free delivery for Richmond Hill",
]

TAGLINE = "Healthy, made-to-order cakes for every celebration."


def draw_divider(c, x, y, w):
    c.setStrokeColor(HexColor("#e6d7cf"))
    c.setLineWidth(0.6)
    c.line(x, y, x + w, y)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A5)
    width, height = A5

    margin_x = 14 * mm
    cursor_y = height - 16 * mm

    # Header
    if os.path.exists(LOGO_PATH):
        c.drawImage(LOGO_PATH, margin_x, cursor_y - 18, width=24 * mm, height=24 * mm, mask='auto')
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(HexColor("#2d2523"))
    c.drawString(margin_x + 30 * mm, cursor_y, "Velora Bakery")

    c.setFont("Helvetica", 10.5)
    c.setFillColor(HexColor("#6c5f5b"))
    c.drawString(margin_x + 30 * mm, cursor_y - 12, TAGLINE)

    cursor_y -= 26
    draw_divider(c, margin_x, cursor_y, width - 2 * margin_x)
    cursor_y -= 12

    # Contact
    c.setFont("Helvetica", 9.5)
    c.setFillColor(HexColor("#2d2523"))
    for line in CONTACT_LINES:
        c.drawString(margin_x, cursor_y, line)
        cursor_y -= 10

    cursor_y -= 6
    draw_divider(c, margin_x, cursor_y, width - 2 * margin_x)
    cursor_y -= 16

    # Menu title
    c.setFont("Helvetica-Bold", 12)
    c.setFillColor(HexColor("#2d2523"))
    c.drawString(margin_x, cursor_y, "Cake Menu (prices per kg)")
    cursor_y -= 12

    c.setFont("Helvetica", 10.5)
    for name, price in MENU_ITEMS:
        c.setFillColor(HexColor("#2d2523"))
        c.drawString(margin_x, cursor_y, name)
        c.setFillColor(HexColor("#f06f5f"))
        c.drawRightString(width - margin_x, cursor_y, f"${price:.2f}")
        cursor_y -= 11

    cursor_y -= 4
    draw_divider(c, margin_x, cursor_y, width - 2 * margin_x)
    cursor_y -= 14

    # Highlights
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(HexColor("#2d2523"))
    c.drawString(margin_x, cursor_y, "Custom Orders")
    cursor_y -= 11
    c.setFont("Helvetica", 10)
    c.setFillColor(HexColor("#6c5f5b"))
    c.drawString(margin_x, cursor_y, "Choose flavors, fillings, and custom messages.")
    cursor_y -= 11
    c.drawString(margin_x, cursor_y, "Pickup and delivery options available.")

    # Images
    image_y = 12 * mm
    image_w = (width - 2 * margin_x - 6 * mm) / 2
    image_h = 26 * mm
    image_x = margin_x

    for idx, img in enumerate(FEATURE_IMAGES):
        if os.path.exists(img):
            c.drawImage(img, image_x, image_y, width=image_w, height=image_h, mask='auto')
        image_x += image_w + 6 * mm

    c.showPage()
    c.save()


if __name__ == "__main__":
    main()
