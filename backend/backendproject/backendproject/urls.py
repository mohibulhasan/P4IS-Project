from django.contrib import admin
from django.urls import path, include
from backendApp.views import * 

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', ReactView.as_view(), name='anything'),
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),  # For GET ALL requests
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),  # For GET, PUT, DELETE
    
    path('customers/', CustomerListCreateView.as_view(), name='customer-list'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('locations/', LocationListCreateView.as_view(), name='location-list-create'),  # For GET ALL requests
    path('locations/<int:pk>/', LocationDetailView.as_view(), name='location-detail'),  # For GET, PUT, DELETE
]

