import uuid
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.text import slugify


class Category(models.Model):
    """
    Product Category for New Rahad Hosiery & Garments (e.g. Baby Wear, Hosiery, Kids Knits).
    Fully dynamic, editable via admin.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, help_text="Category name (e.g., Baby Wear)")
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, help_text="Brief description of this category")
    image = models.ImageField(upload_to='categories/', blank=True, null=True, help_text="Category showcase image")
    is_active = models.BooleanField(default=True, help_text="Toggle category visibility on the site")
    display_order = models.PositiveIntegerField(default=0, help_text="Sort order for display")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Manufactured Product entity. Supports dynamic sizes, multiple images, and up to 3 colors.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products',
        help_text="Product category"
    )
    name = models.CharField(max_length=200, help_text="Product title (e.g. Baby Full Sleeve T-Shirt)")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    product_code = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
        help_text="Unique SKU or factory product code (e.g., NR-BW-001)"
    )
    material = models.CharField(
        max_length=150,
        blank=True,
        help_text="Fabric or material composition (e.g., 100% Combed Cotton Interlock)"
    )
    short_description = models.CharField(
        max_length=300,
        blank=True,
        help_text="Concise summary for cards and search previews"
    )
    description = models.TextField(help_text="Full manufacturing specifications, features, and details")
    is_featured = models.BooleanField(default=False, help_text="Highlight on homepage featured section")
    is_published = models.BooleanField(default=True, help_text="Publish product to catalogue")
    display_order = models.PositiveIntegerField(default=0, help_text="Sort order priority")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ['display_order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            candidate = base_slug
            counter = 1
            while Product.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{counter}"
                counter += 1
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.product_code})"

    @property
    def primary_image(self):
        """Returns the primary image or first available image for previews."""
        primary = self.images.filter(is_primary=True).first()
        if not primary:
            primary = self.images.first()
        return primary


class ProductColor(models.Model):
    """
    Product color entity. Enforces a maximum of 3 colors per product.
    Supports color name, hex code, and optional color-specific photo.
    """
    MAX_COLORS_PER_PRODUCT = 3

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='colors',
        help_text="Associated product"
    )
    name = models.CharField(max_length=50, help_text="Color name (e.g., Pastel Sky Blue)")
    hex_code = models.CharField(
        max_length=7,
        default="#000000",
        help_text="Hexadecimal color code (e.g., #87CEEB)"
    )
    image = models.ImageField(
        upload_to='products/colors/',
        blank=True,
        null=True,
        help_text="Optional photo of the product specifically in this color"
    )

    class Meta:
        verbose_name = "Product Color"
        verbose_name_plural = "Product Colors"
        unique_together = ('product', 'name')

    def clean(self):
        super().clean()
        if self.product_id:
            existing_colors = ProductColor.objects.filter(product=self.product).exclude(pk=self.pk)
            if existing_colors.count() >= self.MAX_COLORS_PER_PRODUCT:
                raise ValidationError(
                    f"A product cannot have more than {self.MAX_COLORS_PER_PRODUCT} colors. "
                    f"Product '{self.product.name}' already has {existing_colors.count()} colors defined."
                )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.name}"


class ProductSize(models.Model):
    """
    Flexible sizing entity (e.g., '0-3 Months', '3-6 Months', 'S', 'M', 'L').
    Defined per product to support diverse baby wear and hosiery dimensions.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='sizes',
        help_text="Associated product"
    )
    size_name = models.CharField(max_length=50, help_text="Size label (e.g., 0-3 Months, Free Size)")
    display_order = models.PositiveIntegerField(default=0, help_text="Order in size selector")

    class Meta:
        verbose_name = "Product Size"
        verbose_name_plural = "Product Sizes"
        ordering = ['display_order', 'size_name']
        unique_together = ('product', 'size_name')

    def __str__(self):
        return f"{self.product.name} - {self.size_name}"


class ProductImage(models.Model):
    """
    Product gallery image supporting primary selection and custom ordering.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        help_text="Associated product"
    )
    image = models.ImageField(upload_to='products/gallery/', help_text="Product photograph")
    alt_text = models.CharField(max_length=200, blank=True, help_text="Descriptive alt text for accessibility and SEO")
    is_primary = models.BooleanField(default=False, help_text="Set as main thumbnail/cover image")
    display_order = models.PositiveIntegerField(default=0, help_text="Order in gallery")

    class Meta:
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"
        ordering = ['display_order', 'id']

    def save(self, *args, **kwargs):
        # If this image is designated primary, unset primary on other images of the same product
        if self.is_primary and self.product_id:
            ProductImage.objects.filter(product=self.product, is_primary=True).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.product.name} {'(Primary)' if self.is_primary else ''}"
