from django.contrib import admin
from django.urls import path, include
from backendApp.views import * 

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', ReactView.as_view(), name='anything'),
    path('employees/create/', EmployeeCreateView.as_view(), name='employee-create'),  # For POST requests
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),  # For GET ALL requests
    path('employees/<str:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),  # For GET, PUT, DELETE
]

