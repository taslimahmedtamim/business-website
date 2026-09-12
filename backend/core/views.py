from django.db import connection
from django.conf import settings
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HealthCheckView(APIView):
    """
    Health check endpoint for New Rahad Hosiery & Garments backend.
    Used by frontend, uptime monitors, and deployment probes.
    """
    permission_classes = []

    def get(self, request):
        db_healthy = True
        db_message = "Connected"
        try:
            connection.ensure_connection()
        except Exception as e:
            db_healthy = False
            db_message = str(e)

        payload = {
            "status": "healthy" if db_healthy else "degraded",
            "service": "New Rahad Hosiery & Garments API",
            "version": "1.0.0",
            "timestamp": timezone.now().isoformat(),
            "debug": settings.DEBUG,
            "database": {
                "engine": settings.DATABASES['default']['ENGINE'].split('.')[-1],
                "connected": db_healthy,
                "detail": db_message,
            },
            "storage_mode": settings.MEDIA_STORAGE_MODE,
        }

        http_status = status.HTTP_200_OK if db_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(payload, status=http_status)


class SiteSettingsView(APIView):
    """
    Public endpoint returning singleton company metadata, contact information,
    social links, and SEO defaults.
    """
    permission_classes = []

    def get(self, request):
        from .models import SiteSettings
        from .serializers import SiteSettingsSerializer
        settings_obj = SiteSettings.load()
        serializer = SiteSettingsSerializer(settings_obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
