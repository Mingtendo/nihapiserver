from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import json
# Create your views here.

"""

"""
@api_view(["GET"])
def index(request):
    return Response(data="Hello world", status=status.HTTP_200_OK)

# Fetches detailed information for a list of IDs.
@api_view(["GET"])
def ncbi_api_get(request):

    # Check that we actually get a GET request.
    if request.method == "GET":

        dummy_data = {
            "term": "medical[pg]",
            "retstart": 0,
            "retmax": 20
        }

        # Base URL
        api_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&"

        try:
            incoming_data = request.data
            ids = ",".join(incoming_data["term"])

            print(f"ids: {ids}")

            complete_url = api_url+ids
            # Handle GET request
            response = requests.get(complete_url)

            return Response(response)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["POST"])
# Retrieves list of publication IDs based on a given query.
def ncbi_api_post(request):

    print(f"request: {request}")
    
    # The NIH API technically accepts both request types and returns the same thing.
    if request.method == 'POST' or request.method == 'GET':

        dummy_data = {
            "term": "medical[pg]",
            "retstart": 0,
            "retmax": 20
        }
        
        # Base URL
        api_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&"

        # Try this, return 400 if the request is malformed somehow.
        try:
            incoming_data = request.data
            print(f"incoming data: {incoming_data}, data type: {type(incoming_data)}")

            incoming_data["term"] = "term=" + incoming_data["term"]
            incoming_data["retstart"] = "restart=" + str(incoming_data["retstart"]) if "retstart" in incoming_data else "restart=0"     # Used for pagination
            incoming_data["retmax"] = "retmax=" + str(incoming_data["retmax"]) if "retmax" in incoming_data else "retmax=20"       # Used for pagination
            incoming_data["retmode"] = "retmode=json"

            complete_url = api_url+"&".join(incoming_data[k] for k in incoming_data)
            # Handle POST request
            response = requests.post(complete_url)
            print(f"response: {response.json()}")
            return Response(response.json(), status=status.HTTP_200_OK)
        except KeyError:

            return Response(status=status.HTTP_400_BAD_REQUEST)
            
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)