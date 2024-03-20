# Author: Nur Deeni

from django.urls import path
from . import views
from .views import check_for_seed_award

urlpatterns = [
    path('', views.garden_view, name='garden'),
    # path('has_approved_requests/', views.has_approved_requests, name='has_approved_requests'),
    path('check_for_seed_award/', check_for_seed_award, name='check_for_seed_award'),
    path('save_planted_seed/', views.save_planted_seed, name='save_planted_seed'),
    path('load_planted_seeds/', views.get_planted_seeds, name='planted_seeds'),    
]