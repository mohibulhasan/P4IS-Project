from django.db import models

# Create your models here.
class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)

    # def __str__(self):
    #     return f"{self.first_name} {self.last_name}"
    
class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    organization = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    ctype = (
        ('IIG', 'IIG'),
        ('ISP', 'ISP'),
        ('NIX', 'NIX')
    )
    customer_type = models.CharField(max_length=100, null=True, choices=ctype)
    location = models.ForeignKey('LocationInfo', on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class LocationInfo(models.Model):
    location_name = models.CharField(max_length=100, null=True)
    def __str__(self):
        return self.location_name

class DeviceInfo(models.Model):
    dtype = (
        ('Router', 'Router'),
        ('Switch', 'Switch'),
    )
    device_name = models.CharField(max_length=200, null=True)
    device_type = models.CharField(max_length=100, null=True, choices=dtype)
    device_location = models.ForeignKey(LocationInfo, on_delete=models.CASCADE)
    device_IP = models.CharField(max_length=200, null=True)
    def __str__(self):
        return self.device_name
    