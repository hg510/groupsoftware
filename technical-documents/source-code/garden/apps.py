# Author: Nur Deeni

from django.apps import AppConfig

class GardenConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'garden'

    def ready(self):
        from . import signals
