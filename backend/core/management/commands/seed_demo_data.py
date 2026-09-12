from django.core.management.base import BaseCommand
from core.models import SiteSettings
from products.models import Category, Product, ProductColor, ProductSize, ProductImage
from factory.models import FactoryProcessStep, FactorySection, Showroom, GalleryItem


class Command(BaseCommand):
    help = "Seeds initial structured demo data for New Rahad Hosiery & Garments"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding New Rahad Hosiery & Garments demo data..."))

        # 1. Site Settings (Singleton)
        settings = SiteSettings.load()
        settings.company_name = "New Rahad Hosiery & Garments"
        settings.tagline = "Quality Hosiery & Baby Wear — Manufactured With Care"
        settings.phone_primary = "+880 1XXX-XXXXXX [Placeholder]"
        settings.whatsapp_number = "+880 1XXX-XXXXXX [Placeholder]"
        settings.email_primary = "info@newrahad.com [Placeholder]"
        settings.email_inquiry = "sales@newrahad.com [Placeholder]"
        settings.physical_address = "Factory & Showroom Premises, Industrial Hub, Bangladesh [Placeholder]"
        settings.facebook_url = "https://facebook.com/newrahadhosiery [Placeholder]"
        settings.google_maps_page_url = "https://maps.google.com [Placeholder]"
        settings.save()
        self.stdout.write(self.style.SUCCESS("[OK] SiteSettings configured."))

        # 2. Categories
        categories_data = [
            {
                "name": "Baby Wear",
                "slug": "baby-wear",
                "description": "Ultra-soft, skin-friendly infant clothing manufactured with combed cotton and non-toxic dyes.",
                "display_order": 1,
            },
            {
                "name": "Hosiery & Socks",
                "slug": "hosiery-socks",
                "description": "High-durability knit socks, infant booties, and everyday hosiery built for maximum comfort.",
                "display_order": 2,
            },
            {
                "name": "Kids Knits",
                "slug": "kids-knits",
                "description": "Breathable, stretch-resistant everyday garments engineered for active toddlers and children.",
                "display_order": 3,
            },
            {
                "name": "Cotton Basics",
                "slug": "cotton-basics",
                "description": "Pure cotton innerwear, undershirts, and essential foundational hosiery pieces.",
                "display_order": 4,
            },
        ]

        cat_map = {}
        for cat_data in categories_data:
            cat, _ = Category.objects.update_or_create(
                slug=cat_data["slug"],
                defaults=cat_data,
            )
            cat_map[cat.slug] = cat
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(cat_map)} Categories created/updated."))

        # 3. Showcase Manufactured Products
        products_data = [
            {
                "category": cat_map["baby-wear"],
                "name": "Infant Full-Sleeve Combed Cotton Romper",
                "slug": "infant-full-sleeve-combed-cotton-romper",
                "product_code": "NR-BW-101",
                "material": "100% Combed Cotton Interlock (190 GSM)",
                "short_description": "Hypoallergenic, ultra-soft full-sleeve baby romper featuring flatlock anti-chafing seams.",
                "description": (
                    "Manufactured in our factory using combed cotton yarn. Specially knitted for gentle elasticity, "
                    "thermal comfort, and irritation-free everyday wear. Features nickel-free snap buttons, tagless neck labels, "
                    "and reinforced double-needle hems."
                ),
                "is_featured": True,
                "display_order": 1,
                "colors": [
                    {"name": "Pastel Sky Blue", "hex_code": "#90CDF4"},
                    {"name": "Soft Peach Coral", "hex_code": "#FBD38D"},
                    {"name": "Pure Cloud White", "hex_code": "#F7FAFC"},
                ],
                "sizes": ["0-3 Months", "3-6 Months", "6-12 Months"],
            },
            {
                "category": cat_map["baby-wear"],
                "name": "Baby Ribbed Cotton Kimono Top & Pant Set",
                "slug": "baby-ribbed-cotton-kimono-set",
                "product_code": "NR-BW-102",
                "material": "95% Cotton, 5% Elastane Rib Knit (210 GSM)",
                "short_description": "Ergonomic wrap-style baby suit with side-tie closure and elasticated soft ankle cuffs.",
                "description": (
                    "Crafted for newborn sensitivity. The breathable rib-knit structure allows natural airflow while keeping "
                    "infants cozy. Easy side-tie design eliminates overhead dressing stress."
                ),
                "is_featured": True,
                "display_order": 2,
                "colors": [
                    {"name": "Sage Meadow Green", "hex_code": "#9AE6B4"},
                    {"name": "Warm Honey Yellow", "hex_code": "#FEEBC8"},
                    {"name": "Heather Grey", "hex_code": "#CBD5E0"},
                ],
                "sizes": ["Newborn", "0-3 Months", "3-6 Months"],
            },
            {
                "category": cat_map["hosiery-socks"],
                "name": "Cushioned Infant Ankle Gripper Socks (Pack of 3)",
                "slug": "cushioned-infant-ankle-gripper-socks",
                "product_code": "NR-HS-201",
                "material": "82% Combed Cotton, 15% Nylon, 3% Spandex",
                "short_description": "Non-slip silicone sole grip socks with stay-on ribbed cuffs and seamless toe linkage.",
                "description": (
                    "Knitted on specialized computerized circular sock machines in our factory. Hand-linked seamless toe closure "
                    "prevents toe irritation. Skid-resistant bottom silicone grip pads offer safety for toddlers learning to walk."
                ),
                "is_featured": True,
                "display_order": 3,
                "colors": [
                    {"name": "Navy & Sky Duo", "hex_code": "#2B6CB0"},
                    {"name": "Blush Pink", "hex_code": "#FED7D7"},
                    {"name": "Charcoal Grey", "hex_code": "#4A5568"},
                ],
                "sizes": ["6-12 Months", "1-2 Years", "2-3 Years"],
            },
            {
                "category": cat_map["cotton-basics"],
                "name": "Premium Cotton Sleeveless Baby Undershirt / Singlet",
                "slug": "premium-cotton-baby-singlet",
                "product_code": "NR-CB-301",
                "material": "100% Super-Combed Cotton Jersey (160 GSM)",
                "short_description": "Essential all-season undershirt providing pure cotton breathability under daily clothing.",
                "description": (
                    "Lightweight, skin-gentle single jersey cotton knitted in our in-house production facility. "
                    "Pre-shrunk fabric ensures consistent shape and fit after repeated washing cycles."
                ),
                "is_featured": False,
                "display_order": 4,
                "colors": [
                    {"name": "Optical White", "hex_code": "#FFFFFF"},
                    {"name": "Natural Cream", "hex_code": "#FEFCBF"},
                ],
                "sizes": ["0-6 Months", "6-12 Months", "1-2 Years"],
            },
        ]

        for p_data in products_data:
            colors_list = p_data.pop("colors")
            sizes_list = p_data.pop("sizes")

            product, created = Product.objects.update_or_create(
                product_code=p_data["product_code"],
                defaults=p_data,
            )

            # Sync Colors (Enforcing max 3)
            for c_info in colors_list[:3]:
                ProductColor.objects.update_or_create(
                    product=product,
                    name=c_info["name"],
                    defaults={"hex_code": c_info["hex_code"]},
                )

            # Sync Sizes
            for idx, size_name in enumerate(sizes_list):
                ProductSize.objects.update_or_create(
                    product=product,
                    size_name=size_name,
                    defaults={"display_order": idx + 1},
                )

        self.stdout.write(self.style.SUCCESS(f"[OK] {len(products_data)} Products seeded with colors and sizes."))

        # 4. Factory Manufacturing Process Steps (From Production to Product)
        steps_data = [
            {
                "step_number": 1,
                "title": "Raw Yarn Sourcing & Testing",
                "description": "We carefully inspect and select high-grade combed cotton yarns, testing for tensile strength, staple length, and dye absorption.",
            },
            {
                "step_number": 2,
                "title": "In-House Knitting & Loom Weaving",
                "description": "Fabric is knitted on high-precision circular and hosiery knitting machinery to achieve the exact target GSM, elasticity, and softness.",
            },
            {
                "step_number": 3,
                "title": "Pattern Layout & Precision Cutting",
                "description": "Master patterns specifically designed for infants and children are cut with tight tolerances to prevent distortion and fabric wastage.",
            },
            {
                "step_number": 4,
                "title": "Flatlock Assembly & Seam Stitching",
                "description": "Our dedicated sewing floor uses high-speed 4-thread overlock and flatlock stitching so inner seams stay completely smooth against baby skin.",
            },
            {
                "step_number": 5,
                "title": "100% Quality Assurance Check",
                "description": "Every single piece is scrutinized for stitch stability, snap button durability, measurement conformity, and color consistency.",
            },
            {
                "step_number": 6,
                "title": "Steam Ironing & Protective Packaging",
                "description": "Garments undergo steam finishing, delicate folding, and protective packaging ready for showroom distribution and wholesale fulfillment.",
            },
        ]

        for s_data in steps_data:
            FactoryProcessStep.objects.update_or_create(
                step_number=s_data["step_number"],
                defaults=s_data,
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(steps_data)} Factory process steps seeded."))

        # 5. Factory Sections
        sections_data = [
            {
                "section_key": "overview",
                "title": "Manufacturing Facility & Capabilities",
                "subtitle": "Built for scale, calibrated for infant comfort",
                "content": "New Rahad Hosiery & Garments operates an integrated manufacturing floor covering knitting, cutting, stitching, and finishing under one roof.",
                "display_order": 1,
            },
            {
                "section_key": "machinery",
                "title": "Modern Knitting & Hosiery Machinery",
                "subtitle": "Precision engineering for delicate fabrics",
                "content": "Equipped with computerized circular knitting machines, flatlock sewing stations, and automated snap-fastening equipment.",
                "display_order": 2,
            },
            {
                "section_key": "quality_control",
                "title": "Uncompromising Quality Control",
                "subtitle": "Safety first for infant skin",
                "content": "We implement multi-stage quality checkpoints from raw yarn intake to final garment ironing, guaranteeing zero metal contaminants and soft seams.",
                "display_order": 3,
            },
        ]
        for sec in sections_data:
            FactorySection.objects.update_or_create(
                section_key=sec["section_key"],
                defaults=sec,
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(sections_data)} Factory sections seeded."))

        # 6. Showroom
        Showroom.objects.update_or_create(
            title="Main Factory Showroom",
            defaults={
                "description": "Our on-site showroom displays the full catalogue of manufactured baby wear, hosiery, and kids knitwear. Business buyers and retailers are welcome to examine fabric samples and discuss bulk orders.",
                "address_override": "Factory Showroom, New Rahad Manufacturing Complex [Placeholder]",
                "display_order": 1,
            }
        )
        self.stdout.write(self.style.SUCCESS("[OK] Showroom seeded."))

        # 7. Gallery Items
        gallery_items = [
            {"category": "factory", "title": "Main Knitting Floor", "caption": "Circular knitting machinery in active operation."},
            {"category": "production", "title": "Precision Flatlock Stitching", "caption": "Skilled machine operators sewing anti-chafing infant seams."},
            {"category": "machinery", "title": "High-Speed Hosiery Loom", "caption": "Computerized sock knitting station with auto-link."},
            {"category": "products", "title": "Baby Wear Product Line", "caption": "Sample collection of 100% combed cotton rompers."},
            {"category": "showroom", "title": "Showroom Product Displays", "caption": "Organized rack displays for wholesale buyers and visitors."},
            {"category": "packaging", "title": "Steam Ironing & Packing", "caption": "Final inspection and packaging prior to dispatch."},
        ]
        for g_data in gallery_items:
            GalleryItem.objects.update_or_create(
                title=g_data["title"],
                defaults=g_data,
            )
        self.stdout.write(self.style.SUCCESS(f"[OK] {len(gallery_items)} Gallery showcase items seeded."))

        self.stdout.write(self.style.SUCCESS("\n[SUCCESS] Demo data seeding successfully finished!"))
