from django.urls import path
from .views import HealthCheckView, SiteSettingsView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='api-health'),
    path('settings/', SiteSettingsView.as_view(), name='api-settings'),
]
