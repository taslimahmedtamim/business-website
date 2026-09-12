from rest_framework import generics, status
from rest_framework.response import Response
from .models import ContactInquiry
from .serializers import ContactInquirySerializer


class ContactInquiryCreateView(generics.CreateAPIView):
    """
    Public API: Accepts inquiries from contact form, wholesale inquiries, and product modals.
    """
    serializer_class = ContactInquirySerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "success": True,
                "message": "Thank you for reaching out to New Rahad Hosiery & Garments. We will review your inquiry and get back to you shortly.",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )
