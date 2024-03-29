# Generated by Django 5.0.2 on 2024-03-17 12:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpage', '0001_initial'),
        ('habittracker', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='request',
        ),
        migrations.CreateModel(
            name='HabitRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goal', models.CharField(max_length=150, verbose_name='Goal')),
                ('reviewed', models.BooleanField(default=False, verbose_name='Reviewed')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=10)),
                ('habit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='habittracker.habit', verbose_name='Habit')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='habit_requests', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Habit Request',
                'verbose_name_plural': 'Habit Requests',
            },
        ),
        migrations.DeleteModel(
            name='Request',
        ),
        migrations.DeleteModel(
            name='Response',
        ),
    ]
