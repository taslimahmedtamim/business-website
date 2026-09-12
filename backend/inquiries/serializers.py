from rest_framework import serializers
from .models import ContactInquiry


class ContactInquirySerializer(serializers.ModelSerializer):
    # Honeypot field for anti-spam protection (hidden in frontend UI)
    website_hp = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
        default=''
    )

    class Meta:
        model = ContactInquiry
        fields = [
            'id',
            'full_name',
            'email',
            'phone',
            'subject',
            'inquiry_type',
            'product_of_interest',
            'message',
            'created_at',
            'website_hp',
        ]
        read_only_fields = ['id', 'created_at']

    def validate(self, attrs):
        honeypot = attrs.pop('website_hp', '')
        if honeypot:
            # Bot detected: honeypot field filled
            raise serializers.ValidationError({"error": "Spam detected."})
        return attrs
