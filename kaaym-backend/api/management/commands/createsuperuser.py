# api/management/commands/createsuperuser.py
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Creates a superuser using email as the login field'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, help='Email address')
        parser.add_argument('--password', type=str, help='Password')

    def handle(self, *args, **options):
        User = get_user_model()

        email = options.get('email')
        password = options.get('password')

        if not email:
            email = input("Email address: ").strip()
        if not password:
            while True:
                password = input("Password: ").strip()
                password_confirm = input("Password (again): ").strip()
                if password == password_confirm:
                    break
                self.stdout.write(self.style.ERROR("Passwords do not match. Try again."))

        if not email or not password:
            self.stdout.write(self.style.ERROR("Email and password are required."))
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING(f"A user with email {email} already exists."))
            return

        try:
            user = User.objects.create_superuser(email=email, password=password)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Superuser created successfully: {email}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating superuser: {str(e)}'))