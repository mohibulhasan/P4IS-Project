from rest_framework import serializers
from . models import *

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationInfo
        fields = ['id', 'location_name']

class CustomerSerializer(serializers.ModelSerializer):
    location = LocationSerializer() #https://www.django-rest-framework.org/api-guide/relations/#nested-relationships
    class Meta:
        model = Customer
        fields = '__all__'
        
