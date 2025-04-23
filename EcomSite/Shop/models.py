from django.db import models

# Create your models here.

class Product(models.Model):
    def __str__(self):
        return self.name
    
    name = models.CharField(max_length=200)
    price = models.FloatField()
    discount_price = models.FloatField()
    category = models.CharField(max_length=200)
    desc = models.TextField()
    image = models.CharField(max_length=300)

class Order(models.Model):
    def __str__(self):
        return self.name
    
    items = models.CharField(max_length=1000)
    total = models.IntegerField(default=0)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip = models.IntegerField()