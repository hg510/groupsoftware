# Author: All

from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from adminpage.views import adminPage

urlpatterns = [
    # URL pattern for the Django admin site
    path('admin/', admin.site.urls),

    # URL patterns for other app functionalities
    path("account/", include("accounts.urls")),
    path("",TemplateView.as_view(template_name="home.html"),name="home"),
    path("habit/", include("habittracker.urls")),
    path("garden/", include("garden.urls")),
    path("leaderboard/", include("leaderboard.urls")),
    path("map/", include("map.urls")),
    path("about/",TemplateView.as_view(template_name="about.html"),name="about"),
    path("adminpage/", adminPage, name="adminpage"),
]
