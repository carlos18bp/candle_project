# Generated by Django 5.0.6 on 2024-06-22 21:44

import django.core.validators
import django.db.models.deletion
import django_attachments.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('django_attachments', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=40)),
                ('birthday_date', models.DateField()),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=40)),
                ('titulo', models.CharField(max_length=200)),
                ('descripcion', models.TextField()),
                ('categoria', models.CharField(max_length=40)),
                ('image', django_attachments.fields.SingleImageField(on_delete=django.db.models.deletion.CASCADE, related_name='blog_image', to='django_attachments.library')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('category', models.CharField(max_length=40)),
                ('sub_category', models.CharField(max_length=40)),
                ('description', models.TextField()),
                ('ingredients', models.TextField()),
                ('how_to_use', models.TextField()),
                ('how_to_feel', models.TextField()),
                ('short_description', models.CharField(max_length=80)),
                ('price', models.IntegerField()),
                ('categoria', models.CharField(max_length=40)),
                ('sub_categoria', models.CharField(max_length=40)),
                ('titulo', models.CharField(max_length=40)),
                ('descripcion', models.TextField()),
                ('ingredientes', models.TextField()),
                ('como_usarlo', models.TextField()),
                ('como_se_siente', models.TextField()),
                ('descripcion_corta', models.CharField(max_length=60)),
                ('colors', models.ManyToManyField(related_name='products', to='candle_app.color')),
                ('gallery', django_attachments.fields.GalleryField(on_delete=django.db.models.deletion.CASCADE, related_name='products_with_attachment', to='django_attachments.library')),
            ],
        ),
        migrations.CreateModel(
            name='SoldProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color_selected', models.CharField(max_length=50)),
                ('quantity', models.IntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='candle_app.product')),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('postal_code', models.CharField(max_length=20)),
                ('sold_products', models.ManyToManyField(to='candle_app.soldproduct')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.IntegerField(validators=[django.core.validators.MinValueValidator(1, message='The minimum value allowed is 1'), django.core.validators.MaxValueValidator(5, message='The maximum value allowed is 5')])),
                ('description', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candle_app.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candle_app.user')),
            ],
        ),
    ]
