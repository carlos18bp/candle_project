import json

def review_serializer(reviews):
    """
    Review serializer.
    """
    reviews_serialized = []

    for review in reviews:
        review_data = {
            'id': review.id,
            'rate': review.rate,
            'description': review.description,
            'user_full_name': review.user.full_name,
            'user_birthday_date': review.user.birthday_date.strftime('%Y-%m-%d'),
            'user_email': review.user.email,
            'user_image_url': review.user.image.url,
        }
        reviews_serialized.append(review_data)

    return json.dumps(reviews_serialized)
