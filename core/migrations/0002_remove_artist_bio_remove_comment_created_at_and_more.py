# Generated by Django 4.2.16 on 2024-11-08 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artist',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='text',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user_name',
        ),
        migrations.RemoveField(
            model_name='song',
            name='audio_file',
        ),
        migrations.RemoveField(
            model_name='song',
            name='duration',
        ),
        migrations.AddField(
            model_name='comment',
            name='content',
            field=models.TextField(default=2),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='album',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='album',
            name='title',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='artist',
            name='image',
            field=models.ImageField(upload_to='artists/'),
        ),
        migrations.AlterField(
            model_name='artist',
            name='name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='song',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]