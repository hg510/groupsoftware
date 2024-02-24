from django.utils import timezone
from django.shortcuts import render, redirect
from .models import Habit

def habitTracker(request):
    user = request.user
    today = timezone.now().date()
    form_submitted = Habit.objects.filter(user=user, id__isnull=False).exists()
    
    # Check if the request method is POST
    if request.method == 'POST':
        # Check if the user has already submitted the form for today
        today = timezone.now().date()
        form_submitted = Habit.objects.filter(user=user, date_created__date=today).exists()
        
        if form_submitted:
            # Form already submitted for today, display a message
            return render(request, 'habitTracker.html', {'form_submitted': True})
        
        # Process the form submission
        walk = request.POST.get('walk') == 'on'
        plastic = request.POST.get('plastic') == 'on'
        food = request.POST.get('food') == 'on'
        
        # Create a new Habit object with auto-set date_created
        habit = Habit.objects.create(user=user, walk=walk, plastic=plastic, food=food)
        
        # Redirect the user to a success page or home page
        return redirect('home')
    
    # If the request method is not POST, check if the user has already submitted the form for today
    today = timezone.now().date()
    form_submitted = Habit.objects.filter(user=user, date_created__date=today).exists()
    
    # Render the habit tracker form with a flag indicating if the form has already been submitted
    return render(request, 'habitTracker.html', {'form_submitted': form_submitted})
