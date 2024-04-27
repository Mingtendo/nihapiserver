from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
# Create your views here.

"""
Affiliation [ad]
All Fields [all]
Article Identifier [aid]
Author [au]
Author Identifier [auid]
Book [book]
Comment Correction Type
Completion Date [dcom]
Conflict of Interest Statement [cois]
Corporate Author [cn]
Create Date [crdt]
EC/RN Number [rn]
Editor [ed]
Entry Date [edat]
Filter [filter] [sb]
First Author Name [1au]
Full Author Name [fau]
Full Investigator Name [fir]
Grants and Funding [gr]
Investigator [ir]
ISBN [isbn]
Issue [ip]
Journal [ta]
Language [la]
Last Author Name [lastau]
Location ID [lid]
MeSH Date [mhda]
MeSH Major Topic [majr]
MeSH Subheadings [sh]
MeSH Terms [mh]
Modification Date [lr]
NLM Unique ID [jid]
Other Term [ot]
Owner
Pagination [pg]
Personal Name as Subject [ps]
Pharmacological Action [pa]
Place of Publication [pl]
PMCID and MID
PMID [pmid]
Publication Date [dp]
Publication Type [pt]
Publisher [pubn]
Secondary Source ID [si]
Subset [sb]
Supplementary Concept [nm]
Text Words [tw]
Title [ti]
Title/Abstract [tiab]
Transliterated Title [tt]
Volume [vi]
"""
@api_view(["GET"])
def index(request):
    return Response(data="Hello world", status=status.HTTP_200_OK)

# Fetches detailed information for a list of IDs.
@api_view(["GET"])
def ncbi_api_get(request, format=None):

    # Check that we actually get a GET request.
    if request.method == "GET":
        # Base URL
        api_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed"
        ids = []
        data = ""
        return Response(request.data)
    
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["POST"])
# Retrieves list of publication IDs based on a given query.
def ncbi_api_post(request, format=None):

    print(f"request: {request}")
    
    # The NIH API technically accepts both request types and returns the same thing.
    if request.method == 'POST' or request.method == 'GET':
        # Base URL
        api_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed"
        term = ["term=", "PNAS"]
        retstart = "restart=0"
        retmax = "retmax=50"
        retmode = "retmode=json"

        terms = term[0] + term[1] + "+AND+".join(term[2:])

        complete_url = "&".join([api_url, terms, retstart, retmax, retmode])
        # Handle GET request
        response = requests.post(complete_url)
        print(f"response: {response.json()}")
        return Response(response.json(), status=status.HTTP_200_OK)
    
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)