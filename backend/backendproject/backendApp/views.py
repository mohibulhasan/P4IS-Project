from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response



class ReactView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = ReactSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
