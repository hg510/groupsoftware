# Author: Pawarisa Saiyut

from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView as AuthLoginView
from django.shortcuts import render

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"

class LoginView(AuthLoginView):
    form_class = AuthenticationForm
    template_name = "registration/login.html"