from rest_framework import serializers
from .models import FactoryProcessStep, FactorySection, Showroom, GalleryItem


class FactoryProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = FactoryProcessStep
        fields = [
            'id',
            'step_number',
            'title',
            'description',
            'image',
            'is_active',
        ]


class FactorySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FactorySection
        fields = [
            'id',
            'section_key',
            'title',
            'subtitle',
            'content',
            'image',
            'display_order',
        ]


class ShowroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Showroom
        fields = [
            'id',
            'title',
            'description',
            'address_override',
            'image',
            'display_order',
        ]


class GalleryItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = GalleryItem
        fields = [
            'id',
            'category',
            'category_display',
            'title',
            'caption',
            'image',
            'display_order',
            'created_at',
        ]
