from rest_framework import serializers
from .models import Category, Product, ProductColor, ProductSize, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'image',
            'display_order',
            'products_count',
        ]


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ['id', 'name', 'hex_code', 'image']


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size_name', 'display_order']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'display_order']


class SimpleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductListSerializer(serializers.ModelSerializer):
    category = SimpleCategorySerializer(read_only=True)
    colors = ProductColorSerializer(many=True, read_only=True)
    sizes = serializers.SerializerMethodField()
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'product_code',
            'material',
            'short_description',
            'category',
            'colors',
            'sizes',
            'primary_image',
            'is_featured',
            'created_at',
        ]

    def get_sizes(self, obj):
        return [size.size_name for size in obj.sizes.all()]

    def get_primary_image(self, obj):
        img = obj.primary_image
        if img and img.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(img.image.url)
            return img.image.url
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    category = SimpleCategorySerializer(read_only=True)
    colors = ProductColorSerializer(many=True, read_only=True)
    sizes = ProductSizeSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    related_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'product_code',
            'material',
            'short_description',
            'description',
            'category',
            'colors',
            'sizes',
            'images',
            'is_featured',
            'created_at',
            'updated_at',
            'related_products',
        ]

    def get_related_products(self, obj):
        related = Product.objects.filter(
            category=obj.category,
            is_published=True
        ).exclude(pk=obj.pk)[:4]
        return ProductListSerializer(related, many=True, context=self.context).data
