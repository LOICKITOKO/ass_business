from rest_framework import serializers
from .models import Artist, Album, Song, Comment

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    
    class Meta:
        model = Album
        fields = '__all__'

class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer()

    class Meta:
        model = Song
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    song = SongSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
