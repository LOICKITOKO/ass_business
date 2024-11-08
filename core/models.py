import datetime
from django.db import models

# Modèle pour l'artiste
class Artist(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Modèle pour l'album
class Album(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, related_name='albums', on_delete=models.CASCADE)
    release_date = models.DateField()

    def __str__(self):
        return self.title

# Modèle pour la chanson
class Song(models.Model):
    title = models.CharField(max_length=200)
    album = models.ForeignKey(Album, related_name='songs', on_delete=models.CASCADE)
    duration = models.IntegerField()  # Durée en secondes

    def __str__(self):
        return self.title

# Modèle pour le commentaire
class Comment(models.Model):
    song = models.ForeignKey(Song, related_name='comments', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)  # Champ de date automatique

    def __str__(self):
        return f'Comment by {self.user_name} on {self.song.title}'
