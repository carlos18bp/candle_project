from django.contrib import admin
from .models import Blog, User, Product, Review
from .forms import ProductForm
from django_attachments.admin import AttachmentsAdminMixin

admin.site.site_header = "Candle Project"
admin.site.site_title = "Candle Project"
admin.site.index_title = "Welcome to Candle Project Control Panel"

class ProductAdmin(AttachmentsAdminMixin, admin.ModelAdmin):
	form = ProductForm

	def delete_queryset(self, request, queryset):
		for obj in queryset:
			obj.delete()

admin.site.register(Blog)
admin.site.register(User)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review)