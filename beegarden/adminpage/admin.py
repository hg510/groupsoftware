# adminpage/admin.py

from django.contrib import admin
from .models import Request, Response

# Register the Request model to make it accessible in the Django admin interface
admin.site.register(Request)

# Register the Response model to make it accessible in the Django admin interface
admin.site.register(Response)
