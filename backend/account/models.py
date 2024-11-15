
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password

class MyAccountManager(BaseUserManager):
      
    def create_user(self, email, username, password=None):
        if not email:
                return ValueError("User must have an email address.")
        if not username:
                return ValueError("User must have username")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, username, password=None):
        user = self.create_user(
              email=email,
              username=username,
              password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

def get_profile_image_filepath(self, filename):
	return 'profile_images/' + str(self.pk) + '/profile_image.png'

# def get_default_profile_image():
# 	return "filo/default_profile_image.pngg"
# https://chromewebstore.google.com/detail/dailydev-the-homepage-dev/jlmpjdjjbgclbocgajdjefcidcncaied?pli=1
class Account(AbstractBaseUser):
    email                       = models.EmailField(verbose_name="email", max_length=60, unique=True, default='default@example.com')
    username                    = models.CharField(verbose_name="username", max_length=30, unique=True, default='yourusername')
    password                    = models.CharField(max_length=128, default=make_password('default_password'))

    date_joined                 = models.DateTimeField(verbose_name="date joined",  default=now)
    last_login                  = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin                    = models.BooleanField(default=False)
    is_active                   = models.BooleanField(default=True)
    is_staff                    = models.BooleanField(default=False)
    is_superuser                = models.BooleanField(default=False)

    bio                         = models.TextField(max_length=500, blank=True)
    profile_image               = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True, default=None)
    birth_date                  = models.DateField(null=True, blank=True)

    objects = MyAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
	
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
          return self.is_admin
    
    def has_module_perms(self, app_Label):
          return True

    def get_profile_image_filename(self):
        return str(self.profile_image)[str(self.profile_image).index('profile_images/' + str(self.pk) + "/"):]
