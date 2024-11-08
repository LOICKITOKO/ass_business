"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import AlbumViewSet, ArtistViewSet, SongViewSet, CommentViewSet  # Importer tes vues

# Initialisation du routeur DRF
router = DefaultRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'songs', SongViewSet)
router.register(r'comments', CommentViewSet)

# Définition des URL
urlpatterns = [
    path('admin/', admin.site.urls),  # Accès à l'interface d'administration
    path('api/', include(router.urls)),  # Inclure toutes les routes définies par le routeur
]

# Si tu veux gérer une page d'accueil (optionnel)
from django.http import HttpResponse
urlpatterns += [
    path('', lambda request: HttpResponse('Bienvenue sur l\'API !')),  # Redirige vers une page d'accueil si tu le souhaites
]
