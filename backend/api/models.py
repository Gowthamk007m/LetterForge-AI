from django.db import models

# Create your models here.
from django.db import models

class CoverLetterInput(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    jobTitle = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    currentRole = models.TextField()
    skills = models.TextField()
    achievements = models.TextField()
