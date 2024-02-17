from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("account/", include("accounts.urls")),
    path("garden/", include("garden.urls")),
    path("",TemplateView.as_view(template_name="home.html"),name="home"),
]