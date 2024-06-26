from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid


class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Email address is required')
        
        email = self.normalize_email(email)
        email = email.lower()
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_full_name(self):
        return self.username
    
    def get_short_name(self):
        return self.username
    
    def __str__(self):
        return self.email


class Category(models.Model):
    id = models.CharField(primary_key=True, max_length=500)
    name = models.CharField(max_length=500, unique=True)

    class Meta:
        db_table = 'Category'


class Auction(models.Model):
    id = models.CharField(primary_key=True, max_length=500)
    ownerId = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)
    imageUrl = models.CharField(max_length=500, blank=True, null=True)
    start_price = models.FloatField(blank=True, null=True)
    current_price = models.FloatField(blank=True, null=True)
    current_bidder = models.CharField(max_length=500, blank=True, null=True)
    isPublished = models.BooleanField(default=False)
    categoryId = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True, related_name='courses', db_column='categoryId')
    close_time = models.DateTimeField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Auction'
        indexes = [
            models.Index(fields=['categoryId']),
        ]


class Bid(models.Model):
    id = models.CharField(primary_key=True, max_length=500)
    userId = models.CharField(max_length=500)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name='bids')
    bid_price = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Bid'
        indexes = [
            models.Index(fields=['auction']),
        ]


class BankAccount(models.Model):
    id = models.CharField(primary_key=True, max_length=500)
    card_number = models.CharField(max_length=16)
    card_holder = models.CharField(max_length=100)
    expire_year = models.IntegerField()
    expire_month = models.IntegerField()
    cvv = models.CharField(max_length=3)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'BankAccount'