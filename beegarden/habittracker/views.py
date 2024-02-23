from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Habit

def habitTracker(request):
    if request.method == 'POST':
        
        # Check if the user has already submitted the form for today
        today = timezone.now().date()
        
        form_submitted = Habit.objects.filter(id__isnull=False).exists()
        
        if form_submitted:
            return render(request, 'habitTracker.html', {'form_submitted': True})
        
        # Process the form submission
        walk = request.POST.get('walk') == 'on'
        plastic = request.POST.get('plastic') == 'on'
        food = request.POST.get('food') == 'on'
        habit = Habit.objects.create(walk=walk, plastic=plastic, food=food)
        
        # Redirect the user to a success page or home page
        return redirect('home')
    
    # Render the habit tracker form if it's a GET request or if the form hasn't been submitted yet today
    return render(request, 'habitTracker.html', {'form_submitted': False})
