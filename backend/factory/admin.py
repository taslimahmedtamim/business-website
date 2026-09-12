from django.contrib import admin
from django.utils.html import format_html
from .models import FactoryProcessStep, FactorySection, Showroom, GalleryItem


@admin.register(FactoryProcessStep)
class FactoryProcessStepAdmin(admin.ModelAdmin):
    list_display = ['step_number', 'title', 'is_active', 'image_preview']
    list_display_links = ['title']
    list_editable = ['step_number', 'is_active']
    search_fields = ['title', 'description']
    ordering = ['step_number']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Photo"


@admin.register(FactorySection)
class FactorySectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'section_key', 'display_order', 'section_image_preview']
    list_editable = ['display_order']
    search_fields = ['title', 'content']
    ordering = ['display_order']

    def section_image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    section_image_preview.short_description = "Image"


@admin.register(Showroom)
class ShowroomAdmin(admin.ModelAdmin):
    list_display = ['title', 'display_order', 'showroom_image_preview']
    list_editable = ['display_order']
    search_fields = ['title', 'description', 'address_override']
    ordering = ['display_order']

    def showroom_image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    showroom_image_preview.short_description = "Photo"


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'display_order', 'gallery_thumbnail', 'created_at']
    list_editable = ['display_order']
    list_filter = ['category']
    search_fields = ['title', 'caption']
    ordering = ['display_order', '-created_at']

    def gallery_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 45px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    gallery_thumbnail.short_description = "Image Preview"
