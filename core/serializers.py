from rest_framework import serializers
from .models import Artist, Album, Song, Comment

# Sérialiseur pour le modèle Artist
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

# Sérialiseur pour le modèle Album
class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()  # Sérialisation de l'artiste imbriqué

    class Meta:
        model = Album
        fields = '__all__'  # Tous les champs du modèle Album

    def create(self, validated_data):
        artist_data = validated_data.pop('artist')  # Extraire les données de l'artiste
        artist = Artist.objects.create(**artist_data)  # Créer l'artiste
        album = Album.objects.create(artist=artist, **validated_data)  # Créer l'album et associer l'artiste
        return album

    def update(self, instance, validated_data):
        artist_data = validated_data.pop('artist', None)
        if artist_data:
            artist = instance.artist
            for attr, value in artist_data.items():
                setattr(artist, attr, value)
            artist.save()
        # Mise à jour de l'album
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# Sérialiseur pour le modèle Song
class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer()  # Sérialisation de l'album imbriqué

    class Meta:
        model = Song
        fields = '__all__'

    def create(self, validated_data):
        album_data = validated_data.pop('album')  # Extraire les données de l'album
        album = Album.objects.create(**album_data)  # Créer l'album
        song = Song.objects.create(album=album, **validated_data)  # Créer la chanson et associer l'album
        return song

# Sérialiseur pour le modèle Comment
class CommentSerializer(serializers.ModelSerializer):
    song = SongSerializer()  # Sérialisation de la chanson imbriquée

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        song_data = validated_data.pop('song')  # Extraire les données de la chanson
        song = Song.objects.create(**song_data)  # Créer la chanson
        comment = Comment.objects.create(song=song, **validated_data)  # Créer le commentaire et associer la chanson
        return comment
