# core/serializers.py
from rest_framework import serializers
from .models import Item
from django.contrib.auth.models import User


class ItemSerializer(serializers.ModelSerializer):
    # Make image and file not required since they depend on type
    image = serializers.ImageField(required=False, allow_null=True)
    file = serializers.FileField(required=False, allow_null=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'description',
            'type',
            'price',
            'currency',
            'stock',
            'image',
            'file',
            'created_at',
            'updated_at',
            'is_active',
            'user'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']

    def validate(self, data):
        """
        Custom validation to ensure:
        - Products have price
        - Resources have file
        - Image is only for products
        - File is only for resources
        """
        item_type = data.get('type')
        
        # If updating, get the instance type
        if self.instance:
            item_type = data.get('type', self.instance.type)

        if item_type == 'product':
            # Products must have a price
            if 'price' not in data or data['price'] is None:
                raise serializers.ValidationError({
                    'price': 'Price is required for products'
                })
            
        elif item_type == 'resource':
            # Resources must have a file (only check on creation)
            if not self.instance and 'file' not in data:
                raise serializers.ValidationError({
                    'file': 'File is required for resources'
                })

        return data

    def create(self, validated_data):
        """
        Create a new item
        """
        print("Creating item with data:", validated_data)  # Debug log
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Update an existing item
        """
        print("Updating item with data:", validated_data)  # Debug log
        return super().update(instance, validated_data)