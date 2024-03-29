# Generated by Django 5.0.2 on 2024-02-28 20:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Seed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='SeedInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('seed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventory_items', to='garden.seed')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seed_inventory', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserGarden',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_planted', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('planted', 'Planted'), ('harvested', 'Harvested')], default='planted', max_length=10)),
                ('seed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plants', to='garden.seed')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
