# api/serializers.py
from rest_framework import serializers
from .models import Event, Announcement, Product, DownloadableFile

class DownloadableFileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = DownloadableFile
        fields = ['id', 'title', 'description', 'file_url', 'uploaded_at']

    def get_file_url(self, obj):
        return obj.file.url if obj.file else None


class AnnouncementSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    downloadable_files = DownloadableFileSerializer(many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = '__all__'  # or explicitly list: ['id', 'title', 'description', 'event', 'file_url', 'image_url', 'created_at', 'downloadable_files']

    def get_file_url(self, obj):
        return obj.file.url if obj.file else None

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    downloadable_files = DownloadableFileSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'  # or explicitly: ['id', 'title', 'description', 'price', 'category', 'event', 'image_url', 'created_at', 'downloadable_files']

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None


class EventSerializer(serializers.ModelSerializer):
    announcements = AnnouncementSerializer(many=True, read_only=True)
    products = ProductSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    downloadable_files = DownloadableFileSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = '__all__'  # or explicitly: ['id', 'title', 'description', 'date', 'location', 'image_url', 'created_at', 'updated_at', 'announcements', 'products', 'downloadable_files']

    def get_image_url(self, obj):
        return obj.image.url if obj.image else None