from django.contrib import admin
from .models import Product, Order, Cart, CartItem

# Register your models here.

admin.site.site_header = 'E-commerce Site'
admin.site.site_title = 'Shopping'
admin.site.index_title = 'Manage Shopping'

class ProductAdmin(admin.ModelAdmin):
    def change_category_to_default(self, request, queryset):
        queryset.update(category='General')

    change_category_to_default.short_description = 'Default Category'
    list_display = ('name', 'price', 'discount_price', 'category', 'created_at',)
    search_fields = ('name', 'category',)
    actions = ('change_category_to_default',)
    list_editable = ('price', 'discount_price',)
    readonly_fields = ('created_at', 'updated_at')

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_items', 'total_price', 'created_at')
    search_fields = ('user__username', 'user__email')
    inlines = [CartItemInline]
    readonly_fields = ('total_items', 'total_price', 'created_at', 'updated_at')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'email', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'user__username')
    readonly_fields = ('items', 'total', 'created_at', 'updated_at')

admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(Order, OrderAdmin)