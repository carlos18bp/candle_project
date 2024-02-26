# Generated by Django 5.0.1 on 2024-02-20 01:33

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=40)),
                ('publication_date', models.DateField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='blog_images/')),
            ],
        ),
        migrations.CreateModel(
            name='ProductResource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='product_images/')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=40)),
                ('birthday_date', models.DateField()),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='user_images/')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=40)),
                ('sub_category', models.CharField(max_length=40)),
                ('title', models.CharField(max_length=40)),
                ('description', models.TextField()),
                ('price', models.IntegerField()),
                ('images', models.ManyToManyField(to='candle.productresource')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField(validators=[django.core.validators.MinValueValidator(1, message='The minimum value allowed is 1'), django.core.validators.MaxValueValidator(5, message='The maximum value allowed is 5')])),
                ('description', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candle.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candle.user')),
            ],
        ),
    ]
