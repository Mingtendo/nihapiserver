from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import json
import xmltodict
# Create your views here.

@api_view(["GET"])
def index(request):
    return Response(data="Hello world", status=status.HTTP_200_OK)

# Extracts necessary information from the article. Unclean, but it works for now.
def extractEssentialInfo(dictinput, n):

    parsedArticles = []

    if n == 1:
        article_data = dictinput.get("PubmedArticle", {}).get("MedlineCitation", {})
        smallform = {}
        smallform["PMID"] = article_data.get("PMID",{}).get("#text", "") or ""
        smallform["Title"] = article_data.get("Article",{}).get("ArticleTitle") or ""
        smallform["Abstract"] = article_data.get("Article",{}).get("Abstract") or ""
        smallform["Author List"] = article_data.get("Article",{}).get("AuthorList") or ""
        smallform["Journal"] = article_data.get("Article",{}).get("Journal",{}).get("Title",{}) or ""
        smallform["Pub Year"] = article_data.get("Article",{}).get("Journal",{}).get("JournalIssue",{}).get("Pubdate",{}).get("Year",{}) or ""
        parsedArticles.append(smallform)
        return parsedArticles

    

    # Multiple articles returned.
    for article in dictinput["PubmedArticle"]:
        article_data = article.get("MedlineCitation", {})
        smallform = {}
        smallform["PMID"] = article_data.get("PMID",{}).get("#text", "") or ""
        smallform["Title"] = article_data.get("Article",{}).get("ArticleTitle") or ""
        smallform["Abstract"] = article_data.get("Article",{}).get("Abstract") or ""
        smallform["Author List"] = article_data.get("Article",{}).get("AuthorList") or ""
        smallform["Journal"] = article_data.get("Article",{}).get("Journal",{}).get("Title",{}) or ""
        smallform["Pub Year"] = article_data.get("Article",{}).get("Journal",{}).get("JournalIssue",{}).get("Pubdate",{}).get("Year",{}) or ""
        #smallform["MeSH Terms"] = "<MeshHeadingList>/<MeshHeading>"
        parsedArticles.append(smallform)

    return parsedArticles

# Fetches detailed information for a list of IDs.
# Changed to post because Axios' get requests do not send any data.
@api_view(["GET", "POST"])
def ncbi_api_get(request):

    # Check that we actually get a GET request.
    print(f"request: {request}")
    print(f"request data: {request.data}")
    if request.method == "POST":

        dummy_data = {
            "term": "38648671"
        }

        # Base URL
        api_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&"
        response = None

        try:
            incoming_data = request.data
            ids = "id="+incoming_data["term"]

            #print(f"ids: {ids}")

            complete_url = api_url+ids+"&retmod=xml"
            # Handle GET request
            response = requests.get(complete_url)

        except:
            print("Some error occurred.")
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        processed = xmltodict.parse(response.text)
        processed = processed["PubmedArticleSet"]

        #print(f"processed: {processed}")

        # If there is only one article, it is not put into a list. Check whether we have one or more.
        numberOfArticles = 0
        if type(processed["PubmedArticle"]) == type({}):
            numberOfArticles = 1
        elif processed.get("PubmedArticle") is not None:
            numberOfArticles =  len(processed["PubmedArticle"])
        
        # If we have more than one article, extract all the info we need.
        parsedArticles = extractEssentialInfo(processed, numberOfArticles) if numberOfArticles > 0 else {}

        converted = json.dumps(parsedArticles)
        converted = json.loads(converted)
        #print(converted)

        return Response(converted)
    
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