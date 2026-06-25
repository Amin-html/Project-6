from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListAPI.as_view(), name='category_list'),
    path('products/', views.ProductListAPI.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetailAPI.as_view(), name='product_detail'),
]