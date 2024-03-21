# Author: Pawarisa Saiyut

from django.urls import path
from . import views
from .views import adminPage

urlpatterns = [
    path('adminpage/', adminPage, name='adminpage'),
    # path('check_for_seed_award/', views.check_for_seed_award, name='check_for_seed_award'),
]
