from django.db import models


class SiteSettings(models.Model):
    """
    Singleton model storing global business information, contact channels,
    social links, and default SEO parameters.
    Guarantees no hardcoded company details throughout the application.
    """
    company_name = models.CharField(
        max_length=150,
        default="New Rahad Hosiery & Garments",
        help_text="Official business name"
    )
    tagline = models.CharField(
        max_length=250,
        default="Quality Hosiery & Baby Wear — Manufactured With Care",
        help_text="Hero tagline / brand promise"
    )
    logo = models.ImageField(upload_to='branding/', blank=True, null=True, help_text="Company logo")
    favicon = models.ImageField(upload_to='branding/', blank=True, null=True, help_text="Browser favicon")
    phone_primary = models.CharField(max_length=50, blank=True, default="+880 1XXX-XXXXXX", help_text="Primary phone")
    phone_secondary = models.CharField(max_length=50, blank=True, help_text="Secondary phone / landline")
    whatsapp_number = models.CharField(
        max_length=50,
        blank=True,
        default="+880 1XXX-XXXXXX",
        help_text="WhatsApp inquiry number (international format without spaces/dashes, e.g., 8801700000000)"
    )
    email_primary = models.EmailField(blank=True, default="info@newrahad.com", help_text="Primary contact email")
    email_inquiry = models.EmailField(blank=True, default="sales@newrahad.com", help_text="Sales / wholesale inquiry email")
    physical_address = models.TextField(
        blank=True,
        default="Factory & Showroom Location, Bangladesh",
        help_text="Full physical street and factory address"
    )
    google_maps_embed_url = models.TextField(
        blank=True,
        help_text="Google Maps iframe embed src URL"
    )
    google_maps_page_url = models.URLField(
        blank=True,
        help_text="Direct link to open location in Google Maps app/website"
    )
    facebook_url = models.URLField(
        blank=True,
        help_text="Official Facebook Page URL"
    )
    meta_title_default = models.CharField(
        max_length=150,
        default="New Rahad Hosiery & Garments | Manufacturer of Hosiery & Baby Wear",
        help_text="Default browser title for SEO"
    )
    meta_description_default = models.TextField(
        blank=True,
        default="New Rahad Hosiery & Garments is a genuine manufacturer of premium hosiery and baby wear products. Explore our in-house factory production and product catalogue.",
        help_text="Default search engine snippet"
    )

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        # Enforce singleton pattern (always id=1)
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"{self.company_name} Configuration"
