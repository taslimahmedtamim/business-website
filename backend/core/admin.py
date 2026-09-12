from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """
    Admin configuration for singleton business profile, social links, and SEO defaults.
    Restricts creation of multiple configuration records.
    """
    fieldsets = (
        ("Company Identity", {
            "fields": ("company_name", "tagline", "logo", "favicon"),
            "description": "Primary business branding and visual assets."
        }),
        ("Direct Contact Channels", {
            "fields": ("phone_primary", "phone_secondary", "whatsapp_number", "email_primary", "email_inquiry"),
            "description": "Official communication lines used across the website and CTA buttons."
        }),
        ("Physical Location & Maps", {
            "fields": ("physical_address", "google_maps_embed_url", "google_maps_page_url"),
            "description": "Factory premises address and Google Maps integration."
        }),
        ("Social Presence", {
            "fields": ("facebook_url",),
            "description": "Official social links."
        }),
        ("Global SEO Defaults", {
            "fields": ("meta_title_default", "meta_description_default"),
            "description": "Fallback metadata for search engines and social sharing."
        }),
    )

    def has_add_permission(self, request):
        # Disallow adding a new row if one already exists
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        # Disallow deleting the singleton configuration
        return False
