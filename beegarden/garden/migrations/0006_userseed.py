# Generated by Django 5.0.1 on 2024-03-19 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('garden', '0005_remove_plantedseed_planted_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSeed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chosen_flower', models.CharField(max_length=100)),
            ],
        ),
    ]
