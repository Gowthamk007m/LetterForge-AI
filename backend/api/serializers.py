from rest_framework import serializers
from .models import Userinput

class UserinputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userinput
        fields = '__all__'
