from django.http import JsonResponse
from candle.serializers.review_serializer import review_serializer
from candle.models import Review

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