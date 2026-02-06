"""
Django settings for backend project.
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env.local (development) or .env (production)
from dotenv import load_dotenv
load_dotenv(BASE_DIR / '.env.local')


# =============================================
#  SECURITY & ENVIRONMENT
# =============================================

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-replace-this-in-production-with-environment-variable')

DEBUG = os.getenv('DEBUG', 'False') == 'True'  # False in production
# DEBUG = True  # Hardcoded for local development (media file serving)

# Hosts - critical for Render
ALLOWED_HOSTS = os.getenv(
    'ALLOWED_HOSTS',
    'localhost,127.0.0.1,kaaym-backend.onrender.com,kaaym-backend1.onrender.com,kaaym-mission.onrender.com,.onrender.com'
).split(',')


# =============================================
#  APPLICATIONS
# =============================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',

    # Your app
    'core',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # WhiteNoise for static/media files in production
    'corsheaders.middleware.CorsMiddleware',  # Must be high
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# =============================================
#  DATABASE (SQLite only)
# =============================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# =============================================
#  PASSWORD VALIDATION
# =============================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# =============================================
#  INTERNATIONALIZATION
# =============================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Kampala'
USE_I18N = True
USE_TZ = True


# =============================================
#  STATIC & MEDIA FILES
# =============================================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# WhiteNoise configuration for serving media files in production
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# WhiteNoise serves media files in production
WHITENOISE_ROOT = MEDIA_ROOT


# =============================================
#  DEFAULT PRIMARY KEY
# =============================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# =============================================
#  SESSION & COOKIE SETTINGS (cross-site support)
# =============================================

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_DOMAIN = None  # Let Django handle
SESSION_COOKIE_PATH = '/'
SESSION_COOKIE_SAMESITE = 'None'          # Required for cross-site cookies
SESSION_COOKIE_SECURE = not DEBUG         # True on Render (HTTPS)
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = 1209600              # 2 weeks
SESSION_SAVE_EVERY_REQUEST = True


# =============================================
#  CSRF SETTINGS (cross-site support)
# =============================================

CSRF_COOKIE_NAME = 'csrftoken'
CSRF_COOKIE_DOMAIN = None
CSRF_COOKIE_PATH = '/'
CSRF_COOKIE_SAMESITE = 'None'             # Required
CSRF_COOKIE_SECURE = not DEBUG            # True on Render
CSRF_COOKIE_HTTPONLY = False              # False so JS can read it

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://kaaym-mission.onrender.com',      # ← your frontend domain
    'https://kaaym-backend.onrender.com',      # self-reference (sometimes needed)
    'https://kaaym-backend1.onrender.com',     # legacy reference
]


# =============================================
#  CORS SETTINGS (allow frontend to talk to backend)
# =============================================

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://kaaym-mission.onrender.com',      # ← your actual frontend URL
    'https://kaaym-frontend.onrender.com',      # alternate frontend URL
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]


# =============================================
#  REST FRAMEWORK SETTINGS
# =============================================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}