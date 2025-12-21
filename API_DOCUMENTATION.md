# Food Delivery API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Routes (`/api/auth`)

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer" // or "restaurant_owner", "delivery_partner"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "profileImage": "https://example.com/image.jpg"
}
```

### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

---

## 🏪 Restaurant Routes (`/api/restaurants`)

### Get All Restaurants (with filters)
```http
GET /api/restaurants?search=pizza&cuisine=Italian&isVeg=true&minRating=4&sortBy=rating&page=1&limit=10&latitude=40.7128&longitude=-74.0060&radius=5
```

Query Parameters:
- `search` - Search in name, description, cuisine
- `cuisine` - Filter by cuisine type
- `isVeg` - Filter pure veg restaurants
- `minRating` - Minimum rating filter
- `sortBy` - rating | deliveryTime | deliveryFee
- `page` - Page number
- `limit` - Items per page
- `latitude` & `longitude` - Location-based search
- `radius` - Search radius in km

### Get Restaurant by ID
```http
GET /api/restaurants/:id
```

### Create Restaurant (Restaurant Owner/Admin)
```http
POST /api/restaurants
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Pizza Palace",
  "email": "contact@pizzapalace.com",
  "phone": "+1234567890",
  "description": "Best pizza in town",
  "cuisineType": ["Italian", "Pizza"],
  "logo": "https://example.com/logo.jpg",
  "bannerImage": "https://example.com/banner.jpg",
  "address": {
    "addressLine1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001"
  },
  "location": {
    "type": "Point",
    "coordinates": [-74.0060, 40.7128]
  },
  "operatingHours": {
    "monday": { "open": "09:00", "close": "22:00", "isOpen": true },
    "tuesday": { "open": "09:00", "close": "22:00", "isOpen": true }
  },
  "deliveryTime": "30-40 mins",
  "minimumOrder": 100,
  "deliveryRadius": 5,
  "deliveryFee": 30,
  "isPureVeg": false,
  "fssaiLicense": "12345678901234",
  "gstNumber": "22AAAAA0000A1Z5",
  "bankDetails": {
    "accountName": "Pizza Palace",
    "accountNumber": "1234567890",
    "ifscCode": "ABCD0123456",
    "bankName": "State Bank"
  }
}
```

### Get My Restaurant (Owner)
```http
GET /api/restaurants/my/restaurant
Authorization: Bearer <token>
```

### Update Restaurant
```http
PUT /api/restaurants/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Updated description",
  "deliveryFee": 40
}
```

### Toggle Restaurant Status
```http
PATCH /api/restaurants/:id/toggle-status
Authorization: Bearer <token>
```

### Approve Restaurant (Admin Only)
```http
PATCH /api/restaurants/:id/approve
Authorization: Bearer <admin_token>
```

---

## 🍕 Menu Routes (`/api/menu`)

### Get Restaurant Menu
```http
GET /api/menu/restaurant/:restaurantId?category=Pizza&foodType=veg&isAvailable=true
```

### Get Menu Item by ID
```http
GET /api/menu/:id
```

### Create Menu Item (Restaurant Owner)
```http
POST /api/menu
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomato and mozzarella",
  "category": "Pizza",
  "image": "https://example.com/pizza.jpg",
  "foodType": "veg",
  "price": 299,
  "variants": [
    { "name": "Small", "price": 199 },
    { "name": "Medium", "price": 299 },
    { "name": "Large", "price": 399 }
  ],
  "addons": [
    { "name": "Extra Cheese", "price": 50 },
    { "name": "Olives", "price": 30 }
  ],
  "isAvailable": true,
  "isRecommended": true,
  "preparationTime": "15-20 mins",
  "tags": ["bestseller", "popular"],
  "servesCount": 2
}
```

### Get My Restaurant Menu
```http
GET /api/menu/my/menu
Authorization: Bearer <token>
```

### Update Menu Item
```http
PUT /api/menu/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 349,
  "isAvailable": true
}
```

### Delete Menu Item
```http
DELETE /api/menu/:id
Authorization: Bearer <token>
```

### Toggle Item Availability
```http
PATCH /api/menu/:id/toggle-availability
Authorization: Bearer <token>
```

---

## 📦 Order Routes (`/api/orders`)

### Place Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurant": "restaurant_id",
  "items": [
    {
      "menuItem": "menu_item_id",
      "name": "Margherita Pizza",
      "quantity": 2,
      "price": 299,
      "variant": "Medium",
      "addons": [
        { "name": "Extra Cheese", "price": 50 }
      ],
      "specialInstructions": "Less spicy"
    }
  ],
  "deliveryAddress": "address_id",
  "pricing": {
    "subtotal": 648,
    "deliveryFee": 30,
    "taxAmount": 32.4,
    "discount": 50,
    "packagingCharges": 10,
    "total": 670.4
  },
  "paymentMethod": "cod",
  "coupon": {
    "code": "FIRST50",
    "discountAmount": 50
  },
  "specialInstructions": "Ring the bell twice",
  "contactlessDelivery": true
}
```

### Get My Orders
```http
GET /api/orders/my-orders?status=delivered&page=1&limit=10
Authorization: Bearer <token>
```

### Get Restaurant Orders (Owner)
```http
GET /api/orders/restaurant/orders?status=placed&page=1&limit=20
Authorization: Bearer <token>
```

### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

### Update Order Status
```http
PATCH /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "preparing",
  "note": "Food is being prepared"
}
```

Status options:
- `placed` - Order placed
- `confirmed` - Restaurant confirmed
- `preparing` - Food being prepared
- `ready` - Ready for pickup
- `picked_up` - Delivery partner picked up
- `out_for_delivery` - On the way
- `delivered` - Delivered
- `cancelled` - Cancelled

### Cancel Order
```http
POST /api/orders/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Changed my mind"
}
```

### Get All Orders (Admin)
```http
GET /api/orders?status=delivered&page=1&limit=20&search=ORD-123
Authorization: Bearer <admin_token>
```

---

## 📍 Address Routes (`/api/addresses`)

### Create Address
```http
POST /api/addresses
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "home",
  "label": "Home",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "landmark": "Near Central Park",
  "city": "New York",
  "state": "NY",
  "pincode": "10001",
  "location": {
    "type": "Point",
    "coordinates": [-74.0060, 40.7128]
  },
  "isDefault": true
}
```

### Get My Addresses
```http
GET /api/addresses
Authorization: Bearer <token>
```

### Get Address by ID
```http
GET /api/addresses/:id
Authorization: Bearer <token>
```

### Update Address
```http
PUT /api/addresses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "addressLine1": "456 Updated Street",
  "isDefault": true
}
```

### Delete Address
```http
DELETE /api/addresses/:id
Authorization: Bearer <token>
```

### Set Default Address
```http
PATCH /api/addresses/:id/set-default
Authorization: Bearer <token>
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## 🔑 User Roles

- `customer` - Can browse, order, review
- `restaurant_owner` - Can manage restaurant and menu
- `delivery_partner` - Can accept and deliver orders
- `admin` - Full access to all features

---

## 🧪 Testing with Postman/Thunder Client

1. Register a user
2. Login to get token
3. Use token in Authorization header for protected routes
4. Create restaurant (if restaurant_owner)
5. Add menu items
6. Create address
7. Place order

**All APIs are now live and ready to use!** 🚀
