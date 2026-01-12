# api/models.py
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

# Custom User Manager (unchanged - good!)
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def __str__(self):
        return self.email


# Event model - core container
class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='events/images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title


# Announcement/Flyer/Report (single file + image kept, plus multiple downloadable files)
class Announcement(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=255)
    description = models.TextField()
    file = models.FileField(upload_to='events/files/', blank=True, null=True)  # Legacy single file
    image = models.ImageField(upload_to='events/announcements/images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


# Product/Merchandise
class Product(models.Model):
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, related_name='products', null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='products/images/', blank=True, null=True)
    category = models.CharField(max_length=100, choices=[
        ('books', 'Books (Bibles, Hymn Books)'),
        ('clothing', 'Clothing (Shirts, Skirts)'),
        ('accessories', 'Accessories (Umbrellas)'),
    ], blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title


# New: Multiple downloadable files/reports/flyers for any item
class DownloadableFile(models.Model):
    title = models.CharField(max_length=255)  # e.g. "Mission Schedule PDF", "Bible Study Notes"
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='downloads/')  # All reports/files go here
    uploaded_at = models.DateTimeField(auto_now_add=True)

    # Can be attached to one of these (only one should be set)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='downloadable_files', null=True, blank=True)
    announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE, related_name='downloadable_files', null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='downloadable_files', null=True, blank=True)

    def __str__(self):
        return self.title