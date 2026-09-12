from django.db.models import Count, Q
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product
from .serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public API: Categories list and retrieve.
    Annotates each category with its published product count.
    """
    lookup_field = 'slug'
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.filter(is_active=True).annotate(
            products_count=Count('products', filter=Q(products__is_published=True))
        ).order_by('display_order', 'name')


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public API: Products catalogue and individual product detail.
    Supports live search, category filtering, featured items, and slug lookup.
    """
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'product_code', 'material', 'short_description', 'description']
    ordering_fields = ['display_order', 'created_at', 'name']
    ordering = ['display_order', '-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_published=True).select_related(
            'category'
        ).prefetch_related(
            'colors', 'sizes', 'images'
        )

        # Filter by category (slug or ID)
        category_param = self.request.query_params.get('category')
        if category_param:
            if category_param.isdigit() or len(category_param) > 30:  # UUID or ID
                queryset = queryset.filter(category__id=category_param)
            else:
                queryset = queryset.filter(category__slug=category_param)

        # Filter by featured
        featured_param = self.request.query_params.get('featured')
        if featured_param is not None:
            is_feat = featured_param.lower() in ('true', '1', 'yes')
            queryset = queryset.filter(is_featured=is_feat)

        return queryset
