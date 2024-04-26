from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

# Fetches detailed information for a list of IDs.
def ncbi_api_get(request):
    if request.method == "GET":
        # Handle GET request
        return JsonResponse({'message': 'GET request received'})
    
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt    # Removes error of not having a CSRF cookie set.
# Retrieves list of publication IDs based on a given query.
def ncbi_api_post(request):

    print(f"request: {request}")
    
    if request.method == 'POST':
        # Handle POST request
        api_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
        data = request.POST.get('data', {}) # Get POST data
        response = request.post(api_url, data=data)
        return JsonResponse(response.json(), safe=False)
    
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)