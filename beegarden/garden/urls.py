# Author: Nur Deeni

from django.urls import path
from . import views

urlpatterns = [
    path('', views.garden_view, name='garden'),
    path('save_planted_seed/', views.save_planted_seed, name='save_planted_seed'),
    path('load_planted_seeds/', views.get_planted_seeds, name='planted_seeds'),    
]