from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            'company_name',
            'tagline',
            'logo',
            'favicon',
            'phone_primary',
            'phone_secondary',
            'whatsapp_number',
            'email_primary',
            'email_inquiry',
            'physical_address',
            'google_maps_embed_url',
            'google_maps_page_url',
            'facebook_url',
            'meta_title_default',
            'meta_description_default',
        ]
