# Author: Harry Gammie

from django.contrib import admin
from .models import Habit

# Custom admin interface for Habit model.
class HabitAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_created', 'approved')  
    list_filter = ('approved', 'date_created')  
    actions = ['approve_habits']

    # Custom action to approve selected Habit objects.
    def approve_habits(self, request, queryset):
        queryset.update(approved=True)
    approve_habits.short_description = "Approve selected habits for seeding"

# Register the Habit model and the custom admin interface with the Django admin site.
admin.site.register(Habit, HabitAdmin)
