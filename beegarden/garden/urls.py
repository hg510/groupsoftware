# Author: Nur Deeni

from django.urls import path
from . import views

urlpatterns = [
    path('garden/', views.garden_view, name='garden'),
]
