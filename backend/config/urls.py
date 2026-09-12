"""
Root URL configuration for New Rahad Hosiery & Garments.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Custom Admin branding
admin.site.site_header = "New Rahad Hosiery & Garments Admin"
admin.site.site_title = "New Rahad Admin Portal"
admin.site.index_title = "Factory & Catalogue Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    # Public REST API v1
    path('api/v1/', include('core.urls')),
    path('api/v1/', include('products.urls')),
    path('api/v1/', include('factory.urls')),
    path('api/v1/', include('inquiries.urls')),
]

# In local development mode, serve media and static files directly through Django
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
