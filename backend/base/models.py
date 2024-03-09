from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    Desc = models.CharField(max_length=200)

    def __int__(self):
        return self.id
    
class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    price = models.FloatField()
    description = models.CharField(max_length=100)
    catID = models.ForeignKey(Category , on_delete=models.SET_NULL, null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()

    def __str__(self):
        return str(self.id)

class Order_details(models.Model):
    order_id = models.ForeignKey(Order,on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return str(self.product)
    
    