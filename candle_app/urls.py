from django.urls import path
from .views import blog, product, review

urlpatterns = [
    path('blogs-data/', blog.blog_list, name='blog-list'),
    path('products-data/', product.product_list, name='product-list'),
    path('reviews-data/', review.review_list, name='review-list'),
    path('create-review/', review.create_review, name='create-review'),
]
