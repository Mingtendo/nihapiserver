from django.urls import path

from . import views

urlpatterns = [
    path("api/ncbi", views.ncbi_api_view, name='ncbi_api')
]