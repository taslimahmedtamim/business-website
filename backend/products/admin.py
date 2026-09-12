from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductColor, ProductSize, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'display_order', 'product_count_badge', 'category_image_preview']
    list_editable = ['is_active', 'display_order']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', 'name']

    def product_count_badge(self, obj):
        count = obj.products.count()
        return format_html('<span style="font-weight: bold; background: #e2e8f0; padding: 3px 8px; border-radius: 4px;">{} products</span>', count)
    product_count_badge.short_description = "Products"

    def category_image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    category_image_preview.short_description = "Image"


class ProductColorInline(admin.TabularInline):
    """
    Inline form for Product Colors.
    Strictly restricts input to a maximum of 3 colors per product.
    """
    model = ProductColor
    extra = 1
    max_num = 3  # Admin UI constraint enforcing max 3 colors
    fields = ['name', 'hex_code', 'image', 'color_swatch_preview']
    readonly_fields = ['color_swatch_preview']

    def color_swatch_preview(self, obj):
        if obj and obj.hex_code:
            return format_html(
                '<div style="width: 24px; height: 24px; background-color: {}; border: 1px solid #718096; border-radius: 4px;"></div>',
                obj.hex_code
            )
        return "-"
    color_swatch_preview.short_description = "Preview"


class ProductSizeInline(admin.TabularInline):
    """
    Inline form for Product Sizes. Supports infant sizes (e.g. 0-3M) or standard sizes (S, M, L).
    """
    model = ProductSize
    extra = 2
    fields = ['size_name', 'display_order']
    ordering = ['display_order']


class ProductImageInline(admin.TabularInline):
    """
    Inline form for Product Gallery photos.
    """
    model = ProductImage
    extra = 1
    fields = ['image', 'is_primary', 'alt_text', 'display_order', 'image_thumbnail']
    readonly_fields = ['image_thumbnail']

    def image_thumbnail(self, obj):
        if obj and obj.image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    image_thumbnail.short_description = "Thumbnail"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'product_code',
        'category',
        'is_featured',
        'is_published',
        'colors_summary',
        'sizes_summary',
        'display_order',
        'cover_preview',
    ]
    list_editable = ['is_featured', 'is_published', 'display_order']
    list_filter = ['category', 'is_featured', 'is_published']
    search_fields = ['name', 'product_code', 'material', 'short_description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['display_order', '-created_at']

    fieldsets = (
        ("Basic Information", {
            "fields": ("name", "slug", "product_code", "category", "material"),
            "description": "Primary identifiers and material composition."
        }),
        ("Descriptions", {
            "fields": ("short_description", "description"),
            "description": "Short description for product cards; full narrative for detail pages."
        }),
        ("Visibility & Ordering", {
            "fields": ("is_featured", "is_published", "display_order"),
            "description": "Toggle showcase priority and catalogue visibility."
        }),
    )

    inlines = [ProductColorInline, ProductSizeInline, ProductImageInline]

    def colors_summary(self, obj):
        colors = obj.colors.all()
        if not colors:
            return "-"
        swatches = "".join(
            f'<span title="{c.name}" style="display:inline-block; width:16px; height:16px; background-color:{c.hex_code}; border:1px solid #4a5568; border-radius:3px; margin-right:4px;"></span>'
            for c in colors
        )
        return format_html('{} <small style="color:#718096;">({}/3)</small>', format_html(swatches), colors.count())
    colors_summary.short_description = "Colors (Max 3)"

    def sizes_summary(self, obj):
        sizes = [s.size_name for s in obj.sizes.all()]
        if not sizes:
            return "-"
        return ", ".join(sizes)
    sizes_summary.short_description = "Sizes"

    def cover_preview(self, obj):
        img = obj.primary_image
        if img and img.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px; object-fit: cover;" />', img.image.url)
        return "-"
    cover_preview.short_description = "Cover"
