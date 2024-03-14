import json
from candle.models import Review

def products_serializer(products):
    """
    Product serializer.
    """
    products_serialized = []

    for product in products:
        product_data = {
            'id': product.id,
            'category': product.category,
            'subCategory': product.sub_category,
            'title': product.title,
            'description': product.description,
            'price': product.price,
            'images': _get_images(product.images.all()),
            'reviews': _get_reviews(product.id),
            'categoria': product.categoria,
            'subCategoria': product.sub_categoria,
            'titulo': product.titulo,
            'descripcion': product.descripcion,
        }
        products_serialized.append(product_data)

    return json.dumps(products_serialized)

def _get_images(images):
    images_serialized = []

    for image in images:
        resource_data = {
            'image_url': image.image.url if image.image else '',
        }
        images_serialized.append(resource_data)
    
    return images_serialized

def _get_reviews(product_id):
    reviews = Review.objects.filter(product_id=product_id)
    reviews_serialized = []

    for review in reviews:
        resource_data = {
            'rate': review.rate,
            'description': review.description,
            'user_full_name': review.user.full_name,
            'user_birthday_date': review.user.birthday_date.strftime('%Y-%m-%d'),
            'user_email': review.user.email,
        }
        reviews_serialized.append(resource_data)
    
    return reviews_serialized