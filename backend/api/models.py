from django.db import models

# Create your models here.
from django.db import models

'''Missing fields on model.'''
class CoverLetterInput(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    date= models.DateField()
    designation = models.CharField(max_length=255)
    jobTitle = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    introduction = models.TextField()
    skills = models.TextField()
    previousRole = models.TextField()
    previousCompany = models.TextField()    
    achievements = models.TextField()
    outro = models.TextField()


