# Generated by Django 5.1.4 on 2025-01-04 05:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_indroduction_coverletterinput_introduction'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coverletterinput',
            old_name='approach',
            new_name='outro',
        ),
    ]
