from django.contrib import admin
from .models import Habit

class HabitAdmin(admin.ModelAdmin):
    list_display = ('user', 'date_created', 'approved')  # Show relevant fields
    list_filter = ('approved', 'date_created')  # Enable filtering
    actions = ['approve_habits']

    def approve_habits(self, request, queryset):
        queryset.update(approved=True)
    approve_habits.short_description = "Approve selected habits for seeding"

admin.site.register(Habit, HabitAdmin)
