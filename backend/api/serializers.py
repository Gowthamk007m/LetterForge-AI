from rest_framework import serializers
from .models import CoverLetterInput

class CoverLetterInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverLetterInput
        fields = '__all__'
