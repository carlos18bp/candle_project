from django.http import JsonResponse
from candle.models import Product
from candle.serializers.product_serializer import products_serializer
import json

def index(request):
    """
    Index view to return a JSON products serialized reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON products serialized reponse.
    :rtype: django.http.JsonResponse
    """
    products = Product.objects.all().order_by('-id')
    
    return JsonResponse(products_serializer(products), safe=False)