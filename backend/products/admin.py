from django.contrib import admin
from .models import Category, Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'stock', 'price']
    list_filter = ['category']
    search_fields = ['name']

admin.site.register(Category)

# Register your models here.
