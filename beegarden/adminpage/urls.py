# Author: Pawarisa Saiyut

from django.urls import path
from .views import adminPage

urlpatterns = [
    path('adminpage/', adminPage, name='adminpage'),
]

# urlpatterns = [
#     path('adminpage/', adminPage, name='custom_admin'),
# ]

# urlpatterns = [
#     path('custom-admin/', adminPage, name='custom_admin'),
# ]
