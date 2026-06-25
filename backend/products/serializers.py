from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields — какие поля отдаём в JSON
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    # SerializerMethodField — вычисляемое поле
    # вызывает метод get_image_url
    image_url = serializers.SerializerMethodField()

    # Показываем название категории вместо id
    category_name = serializers.CharField(
        source='category.name',
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description',
            'price', 'stock', 'image_url',
            'category', 'category_name',
            'created_at'
        ]

    def get_image_url(self, obj):
        # Строим полный URL для картинки
        # http://localhost:8000/media/products/image.jpg
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None