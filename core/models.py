from django.db import models

# Modèle pour l'Artiste
class Artist(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='artists/')  # Assurez-vous d'avoir un champ Image pour l'image de l'artiste

    def __str__(self):
        return self.name

# Modèle pour l'Album
class Album(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)  # Champ pour la description de l'album
    release_date = models.DateField()  # Champ pour la date de sortie de l'album
    cover_image = models.ImageField(upload_to='albums/')  # Champ Image pour la couverture de l'album
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name="albums")  # Relation avec l'Artiste

    def __str__(self):
        return self.title

# Modèle pour la Chanson
class Song(models.Model):
    title = models.CharField(max_length=200)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="songs")  # Relation avec l'Album

    def __str__(self):
        return self.title

# Modèle pour le Commentaire
class Comment(models.Model):
    content = models.TextField()
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="comments")  # Relation avec la Chanson

    def __str__(self):
        return self.content[:50]  # Afficher les 50 premiers caractères du commentaire
