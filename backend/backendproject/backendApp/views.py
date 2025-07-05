from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from . models import *
from . serializer import *
from rest_framework.response import Response
from .serializer import ReactSerializer

# # Handles POST requests separately
# class EmployeeCreateView(CreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = ReactSerializer

# Handles GET, PUT, and DELETE requests with pk
class EmployeeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = ReactSerializer

class EmployeeListCreateView(ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = ReactSerializer


# customer view

class CustomerListCreateView(ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer



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

