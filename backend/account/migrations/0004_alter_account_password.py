# Generated by Django 4.2.16 on 2024-09-18 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_account_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='password',
            field=models.CharField(default='pbkdf2_sha256$600000$nQV6WRftdUtcR5w4u5yjjl$ghiyZLtFUgHB1Fw55bX2oGnxCWYC9t/4ywxPXROm/7I=', max_length=128),
        ),
    ]
