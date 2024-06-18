from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from candle_app.models import Product, User, Review
from candle_app.serializers import ReviewSerializer
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

@api_view(['GET'])
def review_list(request):
    """
    List all reviews.
    """
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_review(request):
    """
    Create view to create a new review and return status response.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: Create a new review and status response.
    :rtype: django.http.JsonResponse
    """
    try:
        params = request.data
        
        product = get_object_or_404(Product, id=params['product_id'])

        user, user_created = User.objects.get_or_create(
            full_name=params['full_name'],
            birthday_date=datetime.strptime(params['birthday'], '%Y-%m-%d').date(),
            email=params['email']
        )

        Review.objects.create(
            rate=params['rate'],
            description=params['description'],
            user=user,
            product=product
        )

        return JsonResponse({'message': 'Record created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
