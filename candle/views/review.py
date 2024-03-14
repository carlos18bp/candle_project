import os
import json
from datetime import datetime
from django.core.files import File
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from candle.serializers.review_serializer import review_serializer
from candle.models import User, Product, Review

def index(request):
    """
    Index view to return a JSON reviews serialized reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON reviews serialized reponse.
    :rtype: django.http.JsonResponse
    """
    reviews = Review.objects.all().order_by('-id')

    return JsonResponse(review_serializer(reviews), safe=False)

def create(request):
    """
    Create view to create a new review and return status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: Create a new review and status reponse.
    :rtype: django.http.JsonResponse
    """
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))

            product = get_object_or_404(Product, id=params['productId'])

            user, user_created = User.objects.get_or_create(
                full_name=params['fullName'], 
                birthday_date= datetime.strptime(params['birthday'], '%Y-%m-%d').date(),
                email= params['email']
            )
            
            if user_created:
                image_path = os.getcwd() + '/media/temp/user_temp1.jpg'
                name_file = image_path.split("/")[-1]
                with open(image_path, 'rb') as file:
                    user.image.save(name_file, File(file), save=True)

            
            Review.objects.create(
                rate = params['rate'],
                description = params['description'],
                user = user,
                product = product
            )

            return JsonResponse({'message': 'Record created successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)