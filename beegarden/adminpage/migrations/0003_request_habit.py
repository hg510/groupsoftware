# Generated by Django 5.0.2 on 2024-02-28 21:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpage', '0002_alter_request_options_alter_response_options_and_more'),
        ('habittracker', '0002_habit_approved'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='habit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='habittracker.habit', verbose_name='Habit'),
        ),
    ]
