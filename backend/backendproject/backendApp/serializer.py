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
    #location = LocationSerializer()
    location = serializers.PrimaryKeyRelatedField(queryset=LocationInfo.objects.all())

    class Meta:
        model = Customer
        fields = '__all__'


        
