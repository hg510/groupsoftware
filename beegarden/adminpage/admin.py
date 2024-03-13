# Author: Pawarisa Saiyut

from django.contrib import admin
from .models import HabitRequest, ResponseRequest

# Register the Request model to make it accessible in the Django admin interface
admin.site.register(HabitRequest)

# Register the Response model to make it accessible in the Django admin interface
admin.site.register(ResponseRequest)