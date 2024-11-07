from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField()
    image = models.ImageField(upload_to='artists/', blank=True, null=True)

    def __str__(self):
        return self.name

class Album(models.Model):
    artist = models.ForeignKey(Artist, related_name="albums", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    cover_image = models.ImageField(upload_to='albums/')
    release_date = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.title

class Song(models.Model):
    album = models.ForeignKey(Album, related_name="songs", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to='songs/')
    duration = models.PositiveIntegerField()  # in seconds

    def __str__(self):
        return self.title

class Comment(models.Model):
    song = models.ForeignKey(Song, related_name="comments", on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user_name} on {self.song.title}"
