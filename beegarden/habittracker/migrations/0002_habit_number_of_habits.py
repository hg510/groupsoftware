# Generated by Django 5.0.2 on 2024-03-17 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('habittracker', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='habit',
            name='number_of_habits',
            field=models.IntegerField(default=0),
        ),
    ]
