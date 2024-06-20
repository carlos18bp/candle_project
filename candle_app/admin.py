from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Blog, User, Product, Review, Sale, SoldProduct
from .forms import ProductForm
from django_attachments.admin import AttachmentsAdminMixin

class ProductAdmin(AttachmentsAdminMixin, admin.ModelAdmin):
    form = ProductForm

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.delete()

class SaleAdmin(admin.ModelAdmin):
    def delete_queryset(self, request, queryset):
        for sale in queryset:
            sale.delete()

# Custom AdminSite to organize models by sections
class CandleAdminSite(admin.AdminSite):
    site_header = 'Candle Project'
    site_title = 'Candle Project'
    index_title = 'Welcome to Candle Project Control Panel'

    def get_app_list(self, request):
        app_dict = self._build_app_dict(request)
        # Custom structure for the admin index
        custom_app_list = [
            {
                'name': _('Blog Management'),
                'app_label': 'blog_management',
                'models': [
                    model for model in app_dict.get('candle_app', {}).get('models', [])
                    if model['object_name'] in ['Blog']
                ]
            },
            {
                'name': _('Product Management'),
                'app_label': 'product_management',
                'models': [
                    model for model in app_dict.get('candle_app', {}).get('models', [])
                    if model['object_name'] in ['Product', 'SoldProduct', 'Sale']
                ]
            },
            {
                'name': _('Review Management'),
                'app_label': 'review_management',
                'models': [
                    model for model in app_dict.get('candle_app', {}).get('models', [])
                    if model['object_name'] in ['Review', 'User']
                ]
            }
        ]
        return custom_app_list

# Create an instance of the custom AdminSite
admin_site = CandleAdminSite(name='myadmin')

# Register models with the custom AdminSite
admin_site.register(Blog)
admin_site.register(User)
admin_site.register(Product, ProductAdmin)
admin_site.register(Review)
admin_site.register(Sale, SaleAdmin)
admin_site.register(SoldProduct)
