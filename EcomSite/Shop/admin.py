from django.contrib import admin
from .models import Product, Order

# Register your models here.

admin.site.site_header = 'E-commerse Site'
admin.site.site_title = 'Shopping'
admin.site.index_title = 'Manage Shopping'

class ProductAdmin(admin.ModelAdmin):
    def change_category_to_default(self, request, queryset):
        queryset.update(category='Stationaries')

    change_category_to_default.short_description = 'Default Category'
    list_display = ('name', 'price', 'discount_price', 'category', 'desc',)
    search_fields = ('name', 'category',)
    actions = ('change_category_to_default',)
    fields = ('name', 'price',)
    list_editable = ('price', 'discount_price',)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'items', 'total', 'city', 'state', 'zip',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)