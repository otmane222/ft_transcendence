# Generated by Django 4.2.16 on 2024-09-30 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$mmZUCyvwZEbs0cZxOuoVYf$SOc90Xx71ZUpD6gjYZJQa/QlnpYAK4yY2i0C/SQ2RR4=', max_length=128),
        ),
    ]