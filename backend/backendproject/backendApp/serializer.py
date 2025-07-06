from rest_framework import serializers
from . models import *

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationInfo
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        location = LocationSerializer(read_only=True)
        location_id = serializers.PrimaryKeyRelatedField(
            queryset=LocationInfo.objects.all(), source='location', write_only=True
        )
        fields = '__all__'
        
