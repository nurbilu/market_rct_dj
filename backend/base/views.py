from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import serializers
from .models import Product , Category , Order , Order_details
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['isStaff'] = user.is_staff
        token['isSuper'] = user.is_superuser

        token['isStaffffff'] = "i don't know"
        # ...
        return token



# register
@api_view(['POST'])
def register(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']
    confirmPassword = request.data.get('confirmPassword', '')

    if password == confirmPassword:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        user.is_superuser = False
        user.is_active = True
        user.is_staff = False
        user.save()
        return Response("new user born", status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    def get(self, request):
        my_model =Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            catID = request.data.get('catID')  # Extract catID from request
            if catID:
                try:
                    category = Category.objects.get(id=catID)  # Attempt to get Category instance
                    serializer.save(catID=category)  # Save product with category
                except Category.DoesNotExist:
                    return Response({"error": "Category not found"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()  # Save without category if catID not provided
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    def delete(self, request, id):
        product = Product.objects.get(id=id)
        product.delete()
        return Response('Item deleted')
    
    def put(self, request, id):
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            catID = request.data.get('catID')
            if catID:
                try:
                    category = Category.objects.get(id=catID)
                    serializer.save(catID=category)
                except Category.DoesNotExist:
                    return Response({"error": "Category not found"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer.save()  # Save without updating category if catID not provided
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CategoryView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        category = Category.objects.get(id=id)
        category.delete()
        return Response('Item deleted')
    

class OrderView(APIView):
    def get(self, request):
        my_model = Order.objects.all()
        serializer = OrderSerializer(my_model, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data)
        else:
            return Response (serializer.errors)
        
    def delete(self, request, id):
        order = Order.objects.get(id=id)
        order.delete()
        return Response('Item deleted')
    

@api_view(['GET'])
def index(req):
    return Response({'test':'done'})


# The serializers 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # This should include catID implicitly

    def validate_catID(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("This category does not exist.")
        return value


        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
class Order_detailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_details
        fields = '__all__'