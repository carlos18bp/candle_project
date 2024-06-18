from django.http import HttpResponse

def empty_response(request):
    return HttpResponse('')