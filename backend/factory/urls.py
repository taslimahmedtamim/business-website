from django.urls import path
from .views import (
    FactoryProcessStepListView,
    FactorySectionListView,
    ShowroomListView,
    GalleryItemListView,
)

urlpatterns = [
    path('factory/process-steps/', FactoryProcessStepListView.as_view(), name='factory-process-steps'),
    path('factory/sections/', FactorySectionListView.as_view(), name='factory-sections'),
    path('showroom/', ShowroomListView.as_view(), name='showroom-list'),
    path('gallery/', GalleryItemListView.as_view(), name='gallery-list'),
]
