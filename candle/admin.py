from django.contrib import admin
from .models.blog import Blog
from .models.user import User
from .models.product import Product
from .models.review import Review
from .models.product_resource import ProductResource

admin.site.register(Blog)
admin.site.register(User)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(ProductResource)