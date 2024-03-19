# Author: Pawarisa Saiyut

from django.urls import path
from . import views
from .views import adminPage, clear_seed_award

urlpatterns = [
    path('adminpage/', adminPage, name='adminpage'),
    path('check_for_seed_award/', views.check_for_seed_award, name='check_for_seed_award'),
    path('clear_seed_award/', clear_seed_award, name='clear_seed_award'),
]
