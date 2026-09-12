from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import FactoryProcessStep, FactorySection, Showroom, GalleryItem
from .serializers import (
    FactoryProcessStepSerializer,
    FactorySectionSerializer,
    ShowroomSerializer,
    GalleryItemSerializer,
)


class FactoryProcessStepListView(generics.ListAPIView):
    """
    Public API: Sequential manufacturing process steps (ordered 1 through 6).
    """
    serializer_class = FactoryProcessStepSerializer
    pagination_class = None

    def get_queryset(self):
        return FactoryProcessStep.objects.filter(is_active=True).order_by('step_number')


class FactorySectionListView(generics.ListAPIView):
    """
    Public API: Facility overview sections (Machinery, Quality Control, Infrastructure).
    """
    serializer_class = FactorySectionSerializer
    pagination_class = None
    queryset = FactorySection.objects.all().order_by('display_order')


class ShowroomListView(generics.ListAPIView):
    """
    Public API: Showroom profile and location guidelines.
    """
    serializer_class = ShowroomSerializer
    pagination_class = None
    queryset = Showroom.objects.all().order_by('display_order')


class GalleryItemListView(generics.ListAPIView):
    """
    Public API: Photo gallery with category tab filtering (factory, production, machinery, etc.).
    """
    serializer_class = GalleryItemSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['display_order', 'created_at']
    ordering = ['display_order', '-created_at']

    def get_queryset(self):
        queryset = GalleryItem.objects.all()
        category_param = self.request.query_params.get('category')
        if category_param:
            queryset = queryset.filter(category=category_param)
        return queryset
