# Generated by Django 5.0.2 on 2024-03-19 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adminpage', '0005_alter_habitrequest_acknowledged'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='habitrequest',
            name='acknowledged',
        ),
    ]