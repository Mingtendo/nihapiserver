from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

# Fetches detailed information for a list of IDs.
@api_view(["GET", "POST"])
def ncbi_api_get(request, format=None):
    if request.method == "GET":
        # Handle GET request
        return Response(request)
    
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt    # Removes error of not having a CSRF cookie set.
@api_view(["GET", "POST"])
# Retrieves list of publication IDs based on a given query.
def ncbi_api_post(request, format=None):

    print(f"request: {request}")
    
    if request.method == 'POST':
        # Handle POST request
        api_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
        data = request.POST.get('data', {}) # Get POST data
        response = request.post(api_url, data=data)
        return JsonResponse(response.json(), safe=False)
    
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)