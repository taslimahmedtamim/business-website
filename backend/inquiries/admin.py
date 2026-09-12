from django.contrib import admin
from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = [
        'full_name',
        'phone',
        'email',
        'inquiry_type',
        'product_of_interest',
        'is_read',
        'created_at',
    ]
    list_filter = ['inquiry_type', 'is_read', 'created_at']
    search_fields = ['full_name', 'phone', 'email', 'subject', 'product_of_interest', 'message']
    list_editable = ['is_read']
    readonly_fields = [
        'id',
        'full_name',
        'email',
        'phone',
        'subject',
        'inquiry_type',
        'product_of_interest',
        'message',
        'created_at',
    ]
    ordering = ['-created_at']
    actions = ['mark_as_read', 'mark_as_unread']

    fieldsets = (
        ("Inquiry Overview", {
            "fields": ("full_name", "inquiry_type", "product_of_interest", "created_at", "is_read")
        }),
        ("Contact Details", {
            "fields": ("phone", "email")
        }),
        ("Inquiry Message", {
            "fields": ("subject", "message")
        }),
    )

    def mark_as_read(self, request, queryset):
        rows = queryset.update(is_read=True)
        self.message_user(request, f"{rows} inquiry/inquiries marked as read.")
    mark_as_read.short_description = "Mark selected inquiries as Read"

    def mark_as_unread(self, request, queryset):
        rows = queryset.update(is_read=False)
        self.message_user(request, f"{rows} inquiry/inquiries marked as Unread.")
    mark_as_unread.short_description = "Mark selected inquiries as Unread"
