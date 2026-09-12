import uuid
from django.db import models


class ContactInquiry(models.Model):
    """
    Submissions from the Contact form, Wholesale modal, and Product Inquiry CTAs.
    Stores direct communications for admin review.
    """
    INQUIRY_TYPE_CHOICES = [
        ('general', 'General Inquiry'),
        ('wholesale', 'Wholesale / Bulk Order'),
        ('manufacturing', 'Custom Manufacturing / Contract'),
        ('product', 'Specific Product Inquiry'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=120, help_text="Buyer / Contact Name")
    email = models.EmailField(blank=True, help_text="Email address")
    phone = models.CharField(max_length=50, help_text="Contact / WhatsApp phone number")
    subject = models.CharField(max_length=200, help_text="Inquiry subject")
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPE_CHOICES, default='general')
    product_of_interest = models.CharField(
        max_length=200,
        blank=True,
        help_text="Product name or SKU if inquiry originates from a product page"
    )
    message = models.TextField(help_text="Inquiry message, quantity requirements, or notes")
    is_read = models.BooleanField(default=False, help_text="Mark whether admin has reviewed this inquiry")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact & Wholesale Inquiry"
        verbose_name_plural = "Contact & Wholesale Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_inquiry_type_display()}] {self.full_name} - {self.subject}"
