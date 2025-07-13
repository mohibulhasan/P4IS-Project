from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from . models import *
from . serializer import *
#from rest_framework.response import Response
from .serializer import *
from rest_framework import filters
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from .filters import CustomerFilter


# Handles GET, PUT, and DELETE requests with pk
class EmployeeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeListCreateView(ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# customer view


class CustomerListCreateView(ListCreateAPIView):
    queryset = Customer.objects.all().order_by('first_name')  # Order by first_name
    serializer_class = CustomerSerializer
    
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend] # Enable search functionality
    search_fields = ['first_name', 'last_name', 'email', 'organization']  # Fields to search in
    
    filterset_class = CustomerFilter  # Using custom filter class for filtering by location_id

    
    # def get_queryset(self):
    #     queryset = super().get_queryset()
        
    #     location_id = self.request.query_params.get('location_id')
    #     if location_id is not None:
    #         # 'location__id' refers to the id of the related LocationInfo model
    #         queryset = queryset.filter(location__id=location_id)
    #         return queryset

class CustomerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
class LocationListCreateView(ListCreateAPIView):
    queryset = LocationInfo.objects.all()
    serializer_class = LocationSerializer

class LocationDetailView(RetrieveUpdateDestroyAPIView):
    queryset = LocationInfo.objects.all()
    serializer_class = LocationSerializer



# class ReactView(CreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = ReactSerializer
#     def get(self, request):
#         employees = Employee.objects.all()
#         serializer = ReactSerializer(employees, many=True)
#         return Response(serializer.data, status=200)  
    
#     def post(self, request):
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)
    
#     def put(self, request, pk):
#         employee = Employee.objects.get(id=pk)
#         serializer = ReactSerializer(employee, data=request.data, partial=True)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data, status=200)
#         return Response(serializer.errors, status=400)
#     def delete(self, request, pk):
#         employee = Employee.objects.get(id=pk)
#         employee.delete()
#         return Response(status=204)

