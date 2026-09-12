import uuid
from django.db import models


class FactoryProcessStep(models.Model):
    """
    Step in the dynamic manufacturing pipeline:
    e.g., Yarn Selection -> Circular Knitting -> Pattern Cutting -> Sewing -> Quality Inspection -> Packaging.
    Admin can edit, reorder, add photos, or adjust descriptions.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    step_number = models.PositiveIntegerField(default=1, help_text="Sequential step number (1, 2, 3...)")
    title = models.CharField(max_length=150, help_text="Step title (e.g., Fabric Knitting & Inspection)")
    description = models.TextField(help_text="Detailed explanation of this production phase")
    image = models.ImageField(upload_to='factory/steps/', blank=True, null=True, help_text="Photograph of this activity")
    is_active = models.BooleanField(default=True, help_text="Toggle step visibility in the timeline")

    class Meta:
        verbose_name = "Factory Process Step"
        verbose_name_plural = "Factory Process Steps"
        ordering = ['step_number']

    def __str__(self):
        return f"Step {self.step_number}: {self.title}"


class FactorySection(models.Model):
    """
    Modular content blocks for the factory page:
    e.g. 'Machinery & Equipment', 'Worker Safety & Craftsmanship', 'Quality Control Protocol'.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section_key = models.CharField(
        max_length=50,
        unique=True,
        help_text="Internal key (e.g., overview, machinery, quality_control)"
    )
    title = models.CharField(max_length=200, help_text="Section heading")
    subtitle = models.CharField(max_length=250, blank=True, help_text="Supporting sub-heading")
    content = models.TextField(help_text="Detailed narrative")
    image = models.ImageField(upload_to='factory/sections/', blank=True, null=True, help_text="Section showcase image")
    display_order = models.PositiveIntegerField(default=0, help_text="Display priority")

    class Meta:
        verbose_name = "Factory Section"
        verbose_name_plural = "Factory Sections"
        ordering = ['display_order']

    def __str__(self):
        return self.title


class Showroom(models.Model):
    """
    Showroom profile: details, photographs, visit instructions.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150, help_text="Showroom title (e.g., Main Factory Showroom)")
    description = models.TextField(help_text="Showroom introduction and visiting guidelines")
    address_override = models.TextField(blank=True, help_text="Optional specific address if distinct from factory")
    image = models.ImageField(upload_to='showroom/', blank=True, null=True, help_text="Primary showroom photograph")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Showroom"
        verbose_name_plural = "Showrooms"
        ordering = ['display_order']

    def __str__(self):
        return self.title


class GalleryItem(models.Model):
    """
    Visual media item categorized by activity (Factory, Production, Machinery, Products, Showroom, Packaging).
    Supports lightboxes and filter tabs on the frontend.
    """
    CATEGORY_CHOICES = [
        ('factory', 'Factory & Facility'),
        ('production', 'Production Activities'),
        ('machinery', 'Machinery & Equipment'),
        ('products', 'Product Showcase'),
        ('showroom', 'Showroom'),
        ('packaging', 'Finishing & Packaging'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='factory')
    title = models.CharField(max_length=150, help_text="Photo caption / title")
    caption = models.CharField(max_length=255, blank=True, help_text="Short narrative or subtitle")
    image = models.ImageField(upload_to='gallery/', help_text="High-resolution photograph")
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Gallery Item"
        verbose_name_plural = "Gallery Items"
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"
