# Author: Pawarisa Saiyut

from django.contrib import admin
from .models import HabitRequest

# Register the Request model to make it accessible in the Django admin interface
admin.site.register(HabitRequest)


