from django import views
from django.urls import path
from .views import *
app_name = 'api'


urlpatterns = [
    path('<int:id>/<str:theme>',download_cover_letter,name='download_cover_letter'),
    path('generate-cover-letter',GenerateCoverLetterView.as_view(), name='generate_cover_letter'),
]   