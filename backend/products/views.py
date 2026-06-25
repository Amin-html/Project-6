from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer

class CategoryListAPI(generics.ListAPIView):
    # Список всех категорий
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny] # доступно всем

class ProductListAPI(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()

        # Фильтрация по категории из URL параметра
        # /api/products/?category=phones
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)

        # Поиск по названию
        # /api/products/?q=iphone
        query = self.request.query_params.get('query')
        if query:
            queryset = queryset.filter(name__icontains=query)
        return queryset

class ProductDetailAPI(generics.RetrieveAPIView):
    # Один товар по id
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
# Create your views here.
