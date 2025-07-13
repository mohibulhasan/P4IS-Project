import django_filters
from .models import Customer

class CustomerFilter(django_filters.FilterSet):
    location_id = django_filters.NumberFilter(field_name='location__id')
            # The 'search' is handled by DRF's SearchFilter, not here in django-filter directly for this case.

    class Meta:
        model = Customer
        fields = ['location_id', 'first_name', 'last_name', 'email', 'organization']