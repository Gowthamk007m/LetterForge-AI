from django import views
from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>/',views.download_cover_letter,name='download_cover_letter'),
    path('generate-cover-letter/', views.GenerateCoverLetterView.as_view(), name='generate_cover_letter'),
]