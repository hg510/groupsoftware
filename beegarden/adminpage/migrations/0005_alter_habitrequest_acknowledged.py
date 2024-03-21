# Generated by Django 5.0.2 on 2024-03-18 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpage', '0004_habitrequest_acknowledged'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habitrequest',
            name='acknowledged',
            field=models.BooleanField(db_index=True, default=False, verbose_name='Acknowledged by User'),
        ),
    ]
