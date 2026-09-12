from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Creates or resets a development superuser for New Rahad Hosiery & Garments"

    def add_arguments(self, parser):
        parser.add_argument('--username', default='admin', help="Superuser username (default: admin)")
        parser.add_argument('--email', default='admin@newrahad.com', help="Superuser email")
        parser.add_argument('--password', default='AdminPassword123!', help="Superuser password")

    def handle(self, *args, **options):
        User = get_user_model()
        username = options['username']
        email = options['email']
        password = options['password']

        user, created = User.objects.get_or_create(username=username, defaults={'email': email})
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.email = email
        user.save()

        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"[OK] {action} superuser '{username}' successfully."))
        self.stdout.write(self.style.SUCCESS(f"     Login URL: http://127.0.0.1:8000/admin/"))
        self.stdout.write(self.style.SUCCESS(f"     Username: {username}"))
        self.stdout.write(self.style.SUCCESS(f"     Password: {password}"))
