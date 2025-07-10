from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import *
from .serializer import *

class EmployeeAPITestCase(APITestCase):

    def setUp(self):
        # Creating initial data for Employee
        self.employee1 = Employee.objects.create(
            first_name='John', last_name='Doe', email='john.doe@example.com',
            phone_number='1234567890', department='IT'
        )
        self.employee2 = Employee.objects.create(
            first_name='Jane', last_name='Smith', email='jane.smith@example.com',
            phone_number='0987654321', department='HR'
        )
        # Assuming URL patterns named 'employee-list-create' and 'employee-detail'
        self.list_url = reverse('employee-list-create')
        self.detail_url = reverse('employee-detail', kwargs={'pk': self.employee1.pk})

    def test_get_employee_list(self):
        """
        Ensure we can retrieve a list of employees.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        employees = Employee.objects.all().order_by('id') # Order for consistent test results
        serializer = EmployeeSerializer(employees, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 2)

    def test_create_employee(self):
        """
        Ensure we can create a new employee.
        """
        data = {
            'first_name': 'Bob',
            'last_name': 'Johnson',
            'email': 'bob.j@example.com',
            'phone_number': '1122334455',
            'department': 'Sales'
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 3)
        self.assertEqual(Employee.objects.get(first_name='Bob').email, 'bob.j@example.com')

        # Test invalid creation (e.g., missing required fields, or duplicate unique fields)
        invalid_data = {
            'first_name': 'Invalid',
            'last_name': 'Employee',
            'email': 'john.doe@example.com' # Duplicate email
        }
        response = self.client.post(self.list_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data) # Check if 'email' is in the error response

    def test_get_employee_detail(self):
        """
        Ensure we can retrieve a single employee.
        """
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = EmployeeSerializer(self.employee1)
        self.assertEqual(response.data, serializer.data)

        # Test non-existent employee
        non_existent_url = reverse('employee-detail', kwargs={'pk': 999})
        response = self.client.get(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_employee(self):
        """
        Ensure we can update an existing employee.
        """
        updated_data = {
            'first_name': 'Jonathan',
            'last_name': 'Doe',
            'email': 'john.doe@example.com', # Email should remain the same for this employee
            'phone_number': '9988776655',
            'department': 'DevOps'
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.employee1.refresh_from_db() # Reload the instance from the database
        self.assertEqual(self.employee1.first_name, 'Jonathan')
        self.assertEqual(self.employee1.phone_number, '9988776655')
        self.assertEqual(self.employee1.department, 'DevOps')

        # Test partial update (PATCH)
        patch_data = {'department': 'CloudOps'}
        response = self.client.patch(self.detail_url, patch_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.employee1.refresh_from_db()
        self.assertEqual(self.employee1.department, 'CloudOps')

        # Test update with invalid data (e.g., duplicate email)
        invalid_update_data = {
            'email': 'jane.smith@example.com' # Duplicate email from another employee
        }
        response = self.client.put(self.detail_url, invalid_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)


    def test_delete_employee(self):
        """
        Ensure we can delete an employee.
        """
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Employee.objects.count(), 1) # Only employee2 should remain
        with self.assertRaises(Employee.DoesNotExist):
            Employee.objects.get(pk=self.employee1.pk)

        # Test deleting a non-existent employee
        non_existent_url = reverse('employee-detail', kwargs={'pk': 999})
        response = self.client.delete(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class LocationAPITestCase(APITestCase): # Moved Location before Customer as Customer has a FK to Location

    def setUp(self):
        # Create some initial data for LocationInfo
        self.location1 = LocationInfo.objects.create(location_name='Headquarters')
        self.location2 = LocationInfo.objects.create(location_name='Branch Office')

        self.list_url = reverse('location-list-create')
        self.detail_url = reverse('location-detail', kwargs={'pk': self.location1.pk})

    def test_get_location_list(self):
        """
        Ensure we can retrieve a list of locations.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        locations = LocationInfo.objects.all().order_by('id')
        serializer = LocationSerializer(locations, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(len(response.data), 2)

    def test_create_location(self):
        """
        Ensure we can create a new location.
        """
        data = {
            'location_name': 'Warehouse A'
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LocationInfo.objects.count(), 3)
        self.assertEqual(LocationInfo.objects.get(location_name='Warehouse A').location_name, 'Warehouse A')

        # Test invalid creation (e.g., missing required fields)
        invalid_data = {} # Assuming location_name is required
        response = self.client.post(self.list_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_location_detail(self):
        """
        Ensure we can retrieve a single location.
        """
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = LocationSerializer(self.location1)
        self.assertEqual(response.data, serializer.data)

        # Test non-existent location
        non_existent_url = reverse('location-detail', kwargs={'pk': 999})
        response = self.client.get(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_location(self):
        """
        Ensure we can update an existing location.
        """
        updated_data = {
            'location_name': 'Headquarters NYC'
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.location1.refresh_from_db()
        self.assertEqual(self.location1.location_name, 'Headquarters NYC')

        # Test partial update
        patch_data = {'location_name': 'Main HQ'}
        response = self.client.patch(self.detail_url, patch_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.location1.refresh_from_db()
        self.assertEqual(self.location1.location_name, 'Main HQ')

        # Test update with invalid data (e.g., empty name if not allowed by serializer)
        invalid_update_data = {'location_name': ''}
        response = self.client.put(self.detail_url, invalid_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_location(self):
        """
        Ensure we can delete a location.
        """
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(LocationInfo.objects.count(), 1) # Only location2 should remain
        with self.assertRaises(LocationInfo.DoesNotExist):
            LocationInfo.objects.get(pk=self.location1.pk)

        # Test deleting a non-existent location
        non_existent_url = reverse('location-detail', kwargs={'pk': 999})
        response = self.client.delete(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CustomerAPITestCase(APITestCase):

    def setUp(self):
        # Create a location first, as Customer has a ForeignKey to LocationInfo
        self.location_for_customer = LocationInfo.objects.create(location_name='Customer Location A')
        self.another_location = LocationInfo.objects.create(location_name='Customer Location B')

        # Create some initial data for Customer
        self.customer1 = Customer.objects.create(
            first_name='Alice', last_name='Wonderland', organization='ABC Corp',
            email='alice@example.com', phone='1112223333', customer_type='IIG',
            location=self.location_for_customer
        )
        self.customer2 = Customer.objects.create(
            first_name='Bob', last_name='The Builder', organization='BuildIt Inc',
            email='bob@example.com', phone='4445556666', customer_type='ISP',
            location=self.another_location
        )
        self.list_url = reverse('customer-list')
        self.detail_url = reverse('customer-detail', kwargs={'pk': self.customer1.pk})

    def test_get_customer_list(self):
        """
        Ensure we can retrieve a list of customers.
        """
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        customers = Customer.objects.all().order_by('id')
        serializer = CustomerSerializer(customers, many=True)
        # For PrimaryKeyRelatedField, the serializer output for 'location' will be the PK
        # We need to manually adjust the expected data if comparing directly with serializer.data
        # A simpler way is to check the count and individual fields.
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['first_name'], self.customer1.first_name)
        self.assertEqual(response.data[0]['location'], self.customer1.location.pk) # Check location PK
        self.assertEqual(response.data[1]['first_name'], self.customer2.first_name)


    def test_create_customer(self):
        """
        Ensure we can create a new customer.
        """
        data = {
            'first_name': 'Charlie',
            'last_name': 'Chaplin',
            'organization': 'Silent Films',
            'email': 'charlie@example.com',
            'phone': '7778889999',
            'customer_type': 'NIX',
            'location': self.location_for_customer.pk # Use the PK of an existing location
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 3)
        new_customer = Customer.objects.get(first_name='Charlie')
        self.assertEqual(new_customer.email, 'charlie@example.com')
        self.assertEqual(new_customer.location.pk, self.location_for_customer.pk)

        # Test invalid creation (e.g., invalid customer_type, non-existent location)
        invalid_data = {
            'first_name': 'Invalid', 'last_name': 'Customer',
            'email': 'invalid@example.com', 'customer_type': 'INVALID_TYPE',
            'location': self.location_for_customer.pk
        }
        response = self.client.post(self.list_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('customer_type', response.data)

        invalid_location_data = {
            'first_name': 'NoLocation', 'last_name': 'Customer',
            'email': 'noloc@example.com', 'customer_type': 'IIG',
            'location': 9999 # Non-existent location PK
        }
        response = self.client.post(self.list_url, invalid_location_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('location', response.data)


    def test_get_customer_detail(self):
        """
        Ensure we can retrieve a single customer.
        """
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Manually verify fields since location is PrimaryKeyRelatedField
        self.assertEqual(response.data['first_name'], self.customer1.first_name)
        self.assertEqual(response.data['email'], self.customer1.email)
        self.assertEqual(response.data['location'], self.customer1.location.pk)

        # Test non-existent customer
        non_existent_url = reverse('customer-detail', kwargs={'pk': 999})
        response = self.client.get(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_customer(self):
        """
        Ensure we can update an existing customer.
        """
        updated_data = {
            'first_name': 'Alice Updated',
            'last_name': 'Wonderland',
            'organization': 'Updated Corp',
            'email': 'alice@example.com',
            'phone': '1112223333',
            'customer_type': 'ISP', # Change customer type
            'location': self.another_location.pk # Change location
        }
        response = self.client.put(self.detail_url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.customer1.refresh_from_db()
        self.assertEqual(self.customer1.first_name, 'Alice Updated')
        self.assertEqual(self.customer1.organization, 'Updated Corp')
        self.assertEqual(self.customer1.customer_type, 'ISP')
        self.assertEqual(self.customer1.location.pk, self.another_location.pk)

        # Test partial update
        patch_data = {'organization': 'Patched Org'}
        response = self.client.patch(self.detail_url, patch_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.customer1.refresh_from_db()
        self.assertEqual(self.customer1.organization, 'Patched Org')

        # Test update with invalid customer_type
        invalid_update_data = {
            'customer_type': 'BAD_TYPE',
            'first_name': 'Test', 'last_name': 'Test', 'email': 'test@test.com',
            'organization': 'Org', 'location': self.location_for_customer.pk
        }
        response = self.client.put(self.detail_url, invalid_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('customer_type', response.data)


    def test_delete_customer(self):
        """
        Ensure we can delete a customer.
        """
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Customer.objects.count(), 1) # Only customer2 should remain
        with self.assertRaises(Customer.DoesNotExist):
            Customer.objects.get(pk=self.customer1.pk)

        # Test deleting a non-existent customer
        non_existent_url = reverse('customer-detail', kwargs={'pk': 999})
        response = self.client.delete(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)