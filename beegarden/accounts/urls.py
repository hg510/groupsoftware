from django.urls import path
from .views import SignUpView, LoginView
from django.views.generic.base import TemplateView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
     path('logout/', auth_views.LogoutView.as_view(next_page='landing'), name='logout'),
]