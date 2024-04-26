from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
def ncbi_api_view(request):
    if request.method == "GET":
        # Handle GET request
        return JsonResponse({'message': 'GET request received'})
    
    elif request.method == 'POST':
        # Handle POST request
        api_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
        data = request.POST.get('data', {}) # Get POST data
        response = request.post(api_url, data=data)
        return JsonResponse(response.json(), safe=False)
    
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

