# About the Project

## The Frontend Server

The frontend server allows users to submit queries to ESearch or EFetch by clicking the appropriate button. The textbox allows anything to be submitted, so complex queries are allowed, though they must be formatted correctly.  The user can also submit queries for multiple articles to EFetch by delimiting IDs by number with a comma (i.e. "38648671,38648670" without quotes). For ESearch, it returns direct links to the first 20 articles.

### Possible Improvements
There was insufficient time to implement drop-down menus to make constructing complex queries easier, though that would be an easy extension. Additionally, the ability to insert the start number and number of values to return would be fairly easy to implement.

### Start the Frontend

1. The front end server can be deployed by running `npm install`.
2. Navigate to `nihapiserver/nihapiclient/` and type `npm run dev` into your terminal.

## The Backend Server

The backend server takes in requests to the ESearch and EFetch APIs for the PubMed database (other databases not tested). Using the frontend or an application like Postman, it takes in JSON-formatted POST requests and uses them to retreive information. The API only requires a JSON object containing the query string with a key of "term". Anything can be passed into "term" so long as it is a string, allowing for complex searches similar to the official website's query box.

The esearch/ URL submits requests to ESearch, and returns all data received from the service to the frontend.
The efetch/ URL submits requests to EFetch, and parses through the returned XML data to return a JSON object containing the PMID, title, abstract, author list, journal, and publication year. The backend server also handles cases where these fields do not exist.

### Possible Improvements
Due to the constraints of the backend, the user experience leaves much to be desired. In order to have complex searches beyond just search terms, like relative date searching, that capability would have to be added. Furthermore, because the API expects essentially the backend of a URL, using it can be tedious, unlike the real query box at https://pubmed.ncbi.nlm.nih.gov/advanced/. For EFetch queries, MeSH Terms as a field was left out due to time constraints, but this could be implemented with more time and results that contained these fields. 

### Start the Backend

1. Make a virtual environment at its directory, and install all the packages in`requirements.txt` into it (or install them globally) using `pip install -r requirements.txt`. 
2. Navigate to `nihapiserver/` and type `python manage.py runserver` into your terminal.