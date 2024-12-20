from django import views
from django.urls import path

from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('generate-cover-letter/', views.GenerateCoverLetterView.as_view(), name='generate_cover_letter'),
    path('cover-letter/', views.HmtllView.as_view(), name='cover-letter-minimalist-professional'),
]