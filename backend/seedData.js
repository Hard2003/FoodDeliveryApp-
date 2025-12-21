require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/FoodDelivery";

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

async function seedData() {
  try {
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({ role: "restaurant_partner" });
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    console.log("👤 Creating restaurant owners...");
    const restaurantOwners = [];
    const ownerData = [
      { name: "Marco Rossi", email: "marco@pizzapalace.com", phone: "+1234567890", role: "restaurant_partner" },
      { name: "Raj Patel", email: "raj@spicedelight.com", phone: "+1234567891", role: "restaurant_partner" },
      { name: "Sarah Johnson", email: "sarah@burgerhaus.com", phone: "+1234567892", role: "restaurant_partner" },
      { name: "Chen Wei", email: "chen@dragonfeast.com", phone: "+1234567893", role: "restaurant_partner" },
      { name: "Ahmed Hassan", email: "ahmed@mediterraneanbites.com", phone: "+1234567894", role: "restaurant_partner" },
      { name: "Maria Garcia", email: "maria@tacosfiesta.com", phone: "+1234567895", role: "restaurant_partner" },
      { name: "Liam O'Connor", email: "liam@grillhouse.com", phone: "+1234567896", role: "restaurant_partner" },
      { name: "Sofia Martins", email: "sofia@pastabella.com", phone: "+1234567897", role: "restaurant_partner" },
      { name: "Noah Smith", email: "noah@veggievibes.com", phone: "+1234567898", role: "restaurant_partner" },
      { name: "Emma Brown", email: "emma@coastalcafe.com", phone: "+1234567899", role: "restaurant_partner" },
      { name: "Olivia Lee", email: "olivia@sushistreet.com", phone: "+1234567800", role: "restaurant_partner" },
      { name: "Ethan Davis", email: "ethan@steakcraft.com", phone: "+1234567801", role: "restaurant_partner" },
      { name: "Ava Wilson", email: "ava@brunchbarn.com", phone: "+1234567802", role: "restaurant_partner" },
      { name: "Mason Clark", email: "mason@ramenrepublic.com", phone: "+1234567803", role: "restaurant_partner" },
      { name: "Isabella Turner", email: "isabella@saladstudio.com", phone: "+1234567804", role: "restaurant_partner" },
      { name: "Lucas Martinez", email: "lucas@tapastrail.com", phone: "+1234567805", role: "restaurant_partner" },
      { name: "Mia Hernandez", email: "mia@sweettooth.com", phone: "+1234567806", role: "restaurant_partner" },
      { name: "James Walker", email: "james@bbqsmokehouse.com", phone: "+1234567807", role: "restaurant_partner" },
      { name: "Harper Scott", email: "harper@pokenjoy.com", phone: "+1234567808", role: "restaurant_partner" },
      { name: "Elijah Green", email: "elijah@detroitdough.com", phone: "+1234567809", role: "restaurant_partner" }
    ];

    const salt = await bcrypt.genSalt(10);
    for (const data of ownerData) {
      const hashedPassword = await bcrypt.hash("password123", salt);
      const owner = await User.create({
        ...data,
        password: hashedPassword,
        address: "Restaurant District, Food City"
      });
      restaurantOwners.push(owner);
    }

    console.log("🏪 Creating restaurants...");
    const restaurants = [];
    const operatingHours = {
      monday: { open: "11:00", close: "23:00", isOpen: true },
      tuesday: { open: "11:00", close: "23:00", isOpen: true },
      wednesday: { open: "11:00", close: "23:00", isOpen: true },
      thursday: { open: "11:00", close: "23:00", isOpen: true },
      friday: { open: "11:00", close: "24:00", isOpen: true },
      saturday: { open: "11:00", close: "24:00", isOpen: true },
      sunday: { open: "12:00", close: "22:00", isOpen: true }
    };

    const restaurantData = [
      { name: "Pizza Palace", owner: restaurantOwners[0]._id, email: "orders@pizzapalace.com", phone: "+1234567890", description: "Authentic Italian pizzas baked in wood-fired ovens.", cuisineType: ["Italian", "Pizza"], logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop", address: { addressLine1: "123 Pizza Street", city: "Food City", state: "FC", pincode: "12345" }, location: { type: "Point", coordinates: [-74.006, 40.7128] }, deliveryTime: "25-35 mins", minimumOrder: 15, rating: 4.5, totalReviews: 1250, fssaiLicense: "FSSAI12345678901", gstNumber: "GST1234567890", deliveryFee: 2.99, isPureVeg: false },
      { name: "Spice Delight", owner: restaurantOwners[1]._id, email: "orders@spicedelight.com", phone: "+1234567891", description: "Traditional Indian cuisine with authentic spices and flavors.", cuisineType: ["Indian", "Vegetarian", "Curry"], logo: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=400&fit=crop", address: { addressLine1: "456 Spice Avenue", city: "Food City", state: "FC", pincode: "12346" }, location: { type: "Point", coordinates: [-74.008, 40.713] }, deliveryTime: "30-40 mins", minimumOrder: 20, rating: 4.7, totalReviews: 890, fssaiLicense: "FSSAI12345678902", gstNumber: "GST1234567891", deliveryFee: 3.99, isPureVeg: true },
      { name: "Burger Haus", owner: restaurantOwners[2]._id, email: "orders@burgerhaus.com", phone: "+1234567892", description: "Premium gourmet burgers made with locally sourced beef and fresh ingredients.", cuisineType: ["American", "Fast Food", "Burgers"], logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop", address: { addressLine1: "789 Burger Boulevard", city: "Food City", state: "FC", pincode: "12347" }, location: { type: "Point", coordinates: [-74.01, 40.7132] }, deliveryTime: "20-30 mins", minimumOrder: 12, rating: 4.3, totalReviews: 2100, fssaiLicense: "FSSAI12345678903", gstNumber: "GST1234567892", deliveryFee: 2.49, isPureVeg: false },
      { name: "Dragon Feast", owner: restaurantOwners[3]._id, email: "orders@dragonfeast.com", phone: "+1234567893", description: "Authentic Chinese cuisine featuring traditional dishes and modern interpretations.", cuisineType: ["Chinese", "Asian", "Noodles"], logo: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=800&h=400&fit=crop", address: { addressLine1: "321 Dragon Road", city: "Food City", state: "FC", pincode: "12348" }, location: { type: "Point", coordinates: [-74.012, 40.7134] }, deliveryTime: "25-35 mins", minimumOrder: 18, rating: 4.6, totalReviews: 750, fssaiLicense: "FSSAI12345678904", gstNumber: "GST1234567893", deliveryFee: 3.49, isPureVeg: false },
      { name: "Mediterranean Bites", owner: restaurantOwners[4]._id, email: "orders@mediterraneanbites.com", phone: "+1234567894", description: "Fresh Mediterranean cuisine with falafel, hummus, and grilled specialties.", cuisineType: ["Mediterranean", "Healthy", "Middle Eastern"], logo: "https://images.unsplash.com/photo-1544510503-7ad532836c4f?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop", address: { addressLine1: "654 Mediterranean Way", city: "Food City", state: "FC", pincode: "12349" }, location: { type: "Point", coordinates: [-74.014, 40.7136] }, deliveryTime: "20-30 mins", minimumOrder: 16, rating: 4.4, totalReviews: 620, fssaiLicense: "FSSAI12345678905", gstNumber: "GST1234567894", deliveryFee: 2.99, isPureVeg: false },
      { name: "Tacos Fiesta", owner: restaurantOwners[5]._id, email: "orders@tacosfiesta.com", phone: "+1234567895", description: "Vibrant Mexican street food with tacos, burritos, and fresh salsas.", cuisineType: ["Mexican", "Street Food", "Spicy"], logo: "https://images.unsplash.com/photo-1565299585323-38174c8e5dc3?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800&h=400&fit=crop", address: { addressLine1: "987 Fiesta Street", city: "Food City", state: "FC", pincode: "12350" }, location: { type: "Point", coordinates: [-74.016, 40.7138] }, deliveryTime: "15-25 mins", minimumOrder: 10, rating: 4.2, totalReviews: 1450, fssaiLicense: "FSSAI12345678906", gstNumber: "GST1234567895", deliveryFee: 1.99, isPureVeg: false },
      { name: "Grill House", owner: restaurantOwners[6]._id, email: "orders@grillhouse.com", phone: "+1234567896", description: "Char-grilled meats and smoky flavors with hearty sides.", cuisineType: ["American", "BBQ"], logo: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop", address: { addressLine1: "12 Smoke Lane", city: "Food City", state: "FC", pincode: "12351" }, location: { type: "Point", coordinates: [-74.018, 40.714] }, deliveryTime: "25-35 mins", minimumOrder: 20, rating: 4.4, totalReviews: 980, fssaiLicense: "FSSAI12345678907", gstNumber: "GST1234567896", deliveryFee: 2.99, isPureVeg: false },
      { name: "Pasta Bella", owner: restaurantOwners[7]._id, email: "orders@pastabella.com", phone: "+1234567897", description: "Slow-simmered sauces, handmade pasta, and rustic Italian plates.", cuisineType: ["Italian", "Pasta"], logo: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb0?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=400&fit=crop", address: { addressLine1: "44 Bella Street", city: "Food City", state: "FC", pincode: "12352" }, location: { type: "Point", coordinates: [-74.02, 40.7142] }, deliveryTime: "20-30 mins", minimumOrder: 14, rating: 4.5, totalReviews: 1130, fssaiLicense: "FSSAI12345678908", gstNumber: "GST1234567897", deliveryFee: 2.49, isPureVeg: false },
      { name: "Veggie Vibes", owner: restaurantOwners[8]._id, email: "orders@veggievibes.com", phone: "+1234567898", description: "Plant-forward bowls, wraps, and salads loaded with greens and grains.", cuisineType: ["Healthy", "Vegetarian"], logo: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop", address: { addressLine1: "88 Greenway", city: "Food City", state: "FC", pincode: "12353" }, location: { type: "Point", coordinates: [-74.022, 40.7144] }, deliveryTime: "15-25 mins", minimumOrder: 12, rating: 4.6, totalReviews: 720, fssaiLicense: "FSSAI12345678909", gstNumber: "GST1234567898", deliveryFee: 1.99, isPureVeg: true },
      { name: "Coastal Cafe", owner: restaurantOwners[9]._id, email: "orders@coastalcafe.com", phone: "+1234567899", description: "Seafood plates, chowders, and beachside classics.", cuisineType: ["Seafood", "Cafe"], logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop", address: { addressLine1: "9 Harbor Lane", city: "Food City", state: "FC", pincode: "12354" }, location: { type: "Point", coordinates: [-74.024, 40.7146] }, deliveryTime: "25-35 mins", minimumOrder: 18, rating: 4.3, totalReviews: 540, fssaiLicense: "FSSAI12345678910", gstNumber: "GST1234567899", deliveryFee: 3.49, isPureVeg: false },
      { name: "Sushi Street", owner: restaurantOwners[10]._id, email: "orders@sushistreet.com", phone: "+1234567800", description: "Hand-rolled sushi, sashimi, and poke with pristine seafood.", cuisineType: ["Japanese", "Sushi"], logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=400&fit=crop", address: { addressLine1: "22 Sakura Lane", city: "Food City", state: "FC", pincode: "12355" }, location: { type: "Point", coordinates: [-74.026, 40.7148] }, deliveryTime: "20-30 mins", minimumOrder: 18, rating: 4.8, totalReviews: 1320, fssaiLicense: "FSSAI12345678911", gstNumber: "GST1234567800", deliveryFee: 3.49, isPureVeg: false },
      { name: "Steak Craft", owner: restaurantOwners[11]._id, email: "orders@steakcraft.com", phone: "+1234567801", description: "Steaks seared to order with chef sauces and hearty sides.", cuisineType: ["Steakhouse", "American"], logo: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1559050019-6b509a68e480?w=800&h=400&fit=crop", address: { addressLine1: "30 Ember Road", city: "Food City", state: "FC", pincode: "12356" }, location: { type: "Point", coordinates: [-74.028, 40.715] }, deliveryTime: "30-40 mins", minimumOrder: 25, rating: 4.4, totalReviews: 860, fssaiLicense: "FSSAI12345678912", gstNumber: "GST1234567801", deliveryFee: 4.49, isPureVeg: false },
      { name: "Brunch Barn", owner: restaurantOwners[12]._id, email: "orders@brunchbarn.com", phone: "+1234567802", description: "All-day brunch staples, fluffy pancakes, and specialty coffee.", cuisineType: ["Cafe", "Breakfast"], logo: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=400&fit=crop", address: { addressLine1: "75 Sunny Side", city: "Food City", state: "FC", pincode: "12357" }, location: { type: "Point", coordinates: [-74.03, 40.7152] }, deliveryTime: "20-30 mins", minimumOrder: 12, rating: 4.5, totalReviews: 640, fssaiLicense: "FSSAI12345678913", gstNumber: "GST1234567802", deliveryFee: 1.99, isPureVeg: false },
      { name: "Ramen Republic", owner: restaurantOwners[13]._id, email: "orders@ramenrepublic.com", phone: "+1234567803", description: "Slow-broth ramen bowls with house-made noodles and toppings.", cuisineType: ["Japanese", "Ramen"], logo: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1604908177035-0ac1c9c5c2b6?w=800&h=400&fit=crop", address: { addressLine1: "66 Noodle St", city: "Food City", state: "FC", pincode: "12358" }, location: { type: "Point", coordinates: [-74.032, 40.7154] }, deliveryTime: "20-30 mins", minimumOrder: 14, rating: 4.7, totalReviews: 910, fssaiLicense: "FSSAI12345678914", gstNumber: "GST1234567803", deliveryFee: 2.49, isPureVeg: false },
      { name: "Salad Studio", owner: restaurantOwners[14]._id, email: "orders@saladstudio.com", phone: "+1234567804", description: "Build-your-own salads and grain bowls with seasonal produce.", cuisineType: ["Healthy", "Salads"], logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop", address: { addressLine1: "101 Fresh Ave", city: "Food City", state: "FC", pincode: "12359" }, location: { type: "Point", coordinates: [-74.034, 40.7156] }, deliveryTime: "15-25 mins", minimumOrder: 10, rating: 4.5, totalReviews: 580, fssaiLicense: "FSSAI12345678915", gstNumber: "GST1234567804", deliveryFee: 1.49, isPureVeg: true },
      { name: "Tapas Trail", owner: restaurantOwners[15]._id, email: "orders@tapastrail.com", phone: "+1234567805", description: "Spanish tapas, paella, and shareable plates with bold flavors.", cuisineType: ["Spanish", "Tapas"], logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb0?w=800&h=400&fit=crop", address: { addressLine1: "50 Valencia Rd", city: "Food City", state: "FC", pincode: "12360" }, location: { type: "Point", coordinates: [-74.036, 40.7158] }, deliveryTime: "25-35 mins", minimumOrder: 18, rating: 4.3, totalReviews: 430, fssaiLicense: "FSSAI12345678916", gstNumber: "GST1234567805", deliveryFee: 2.99, isPureVeg: false },
      { name: "Sweet Tooth", owner: restaurantOwners[16]._id, email: "orders@sweettooth.com", phone: "+1234567806", description: "Dessert shop with cakes, pastries, and ice cream sundaes.", cuisineType: ["Desserts", "Bakery"], logo: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=400&fit=crop", address: { addressLine1: "5 Sugar Lane", city: "Food City", state: "FC", pincode: "12361" }, location: { type: "Point", coordinates: [-74.038, 40.716] }, deliveryTime: "15-25 mins", minimumOrder: 8, rating: 4.6, totalReviews: 700, fssaiLicense: "FSSAI12345678917", gstNumber: "GST1234567806", deliveryFee: 1.49, isPureVeg: true },
      { name: "BBQ Smokehouse", owner: restaurantOwners[17]._id, email: "orders@bbqsmokehouse.com", phone: "+1234567807", description: "Low and slow smoked brisket, ribs, and pitmaster sides.", cuisineType: ["BBQ", "American"], logo: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1559050019-6b509a68e480?w=800&h=400&fit=crop", address: { addressLine1: "77 Pit Road", city: "Food City", state: "FC", pincode: "12362" }, location: { type: "Point", coordinates: [-74.04, 40.7162] }, deliveryTime: "30-45 mins", minimumOrder: 20, rating: 4.4, totalReviews: 510, fssaiLicense: "FSSAI12345678918", gstNumber: "GST1234567807", deliveryFee: 3.49, isPureVeg: false },
      { name: "Poke N Joy", owner: restaurantOwners[18]._id, email: "orders@pokenjoy.com", phone: "+1234567808", description: "Build-your-own poke bowls with fresh fish, greens, and sauces.", cuisineType: ["Hawaiian", "Healthy"], logo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop", address: { addressLine1: "31 Island Ave", city: "Food City", state: "FC", pincode: "12363" }, location: { type: "Point", coordinates: [-74.042, 40.7164] }, deliveryTime: "15-25 mins", minimumOrder: 12, rating: 4.7, totalReviews: 610, fssaiLicense: "FSSAI12345678919", gstNumber: "GST1234567808", deliveryFee: 1.99, isPureVeg: false },
      { name: "Detroit Dough", owner: restaurantOwners[19]._id, email: "orders@detroitdough.com", phone: "+1234567809", description: "Detroit-style deep dish pizzas and cheesy breadsticks.", cuisineType: ["Pizza", "American"], logo: "https://images.unsplash.com/photo-1601924582971-6e5ef22367da?w=200&h=200&fit=crop&crop=center", bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop", address: { addressLine1: "19 Motor Row", city: "Food City", state: "FC", pincode: "12364" }, location: { type: "Point", coordinates: [-74.044, 40.7166] }, deliveryTime: "20-30 mins", minimumOrder: 16, rating: 4.5, totalReviews: 480, fssaiLicense: "FSSAI12345678920", gstNumber: "GST1234567809", deliveryFee: 2.49, isPureVeg: false }
    ];

    for (const data of restaurantData) {
      const restaurant = await Restaurant.create({
        ...data,
        operatingHours,
        isActive: true,
        isApproved: true,
        totalRatings: Math.floor(Math.random() * 500) + 100
      });
      restaurants.push(restaurant);
    }

    console.log("🍽️ Creating menu items...");
    const menuItems = [
      { restaurant: restaurants[0]._id, name: "Margherita Pizza", description: "Fresh mozzarella, basil, tomato sauce", category: "Pizzas", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop", foodType: "veg", price: 16.99, isRecommended: true, isAvailable: true },
      { restaurant: restaurants[0]._id, name: "Pepperoni Feast", description: "Loaded pepperoni with aged mozzarella", category: "Pizzas", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", foodType: "non-veg", price: 18.99, isAvailable: true },
      { restaurant: restaurants[0]._id, name: "BBQ Chicken Pizza", description: "BBQ sauce, chicken, red onions, cilantro", category: "Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", foodType: "non-veg", price: 19.99, isAvailable: true },
      { restaurant: restaurants[0]._id, name: "Garlic Knots", description: "Soft knots with garlic butter and parmesan", category: "Appetizers", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop", foodType: "veg", price: 6.99, isAvailable: true },
      { restaurant: restaurants[0]._id, name: "Caesar Salad", description: "Crisp romaine, parmesan, croutons, caesar dressing", category: "Salads", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop", foodType: "veg", price: 8.99, isAvailable: true },

      { restaurant: restaurants[1]._id, name: "Butter Chicken", description: "Creamy tomato curry with tandoor chicken", category: "Main Course", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop", foodType: "non-veg", price: 18.99, isBestseller: true, isAvailable: true },
      { restaurant: restaurants[1]._id, name: "Paneer Tikka Masala", description: "Charred paneer in rich gravy", category: "Main Course", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop", foodType: "veg", price: 16.49, isAvailable: true },
      { restaurant: restaurants[1]._id, name: "Veg Biryani", description: "Basmati rice with saffron and veggies", category: "Rice", image: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=400&h=300&fit=crop", foodType: "veg", price: 17.99, isAvailable: true },

      { restaurant: restaurants[2]._id, name: "Classic Beef Burger", description: "Cheddar, lettuce, tomato, house sauce", category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", foodType: "non-veg", price: 14.99 },
      { restaurant: restaurants[2]._id, name: "Smoky BBQ Burger", description: "BBQ glaze and crispy onions", category: "Burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop", foodType: "non-veg", price: 16.49 },
      { restaurant: restaurants[2]._id, name: "Loaded Fries", description: "Fries with queso and scallions", category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop", foodType: "veg", price: 8.99 },

      { restaurant: restaurants[3]._id, name: "Sweet and Sour Chicken", description: "Peppers, pineapple, and crispy chicken", category: "Entree", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", foodType: "non-veg", price: 15.99 },
      { restaurant: restaurants[3]._id, name: "Kung Pao Tofu", description: "Spicy tofu with peanuts and chilies", category: "Entree", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop", foodType: "veg", price: 13.99 },
      { restaurant: restaurants[3]._id, name: "Veg Hakka Noodles", description: "Stir-fried noodles with veggies", category: "Noodles", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", foodType: "veg", price: 12.49 },

      { restaurant: restaurants[4]._id, name: "Falafel Wrap", description: "Chickpea falafel, tahini, pickles", category: "Wraps", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop", foodType: "veg", price: 11.49 },
      { restaurant: restaurants[4]._id, name: "Chicken Shawarma", description: "Rotisserie chicken with garlic sauce", category: "Wraps", image: "https://images.unsplash.com/photo-1604908177520-1992b0f0f5c3?w=400&h=300&fit=crop", foodType: "non-veg", price: 13.99 },
      { restaurant: restaurants[4]._id, name: "Hummus Platter", description: "Creamy hummus, pita, olives", category: "Appetizers", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 9.49 },

      { restaurant: restaurants[5]._id, name: "Carne Asada Taco", description: "Grilled steak with pico de gallo", category: "Tacos", image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=300&fit=crop", foodType: "non-veg", price: 12.49 },
      { restaurant: restaurants[5]._id, name: "Chicken Burrito", description: "Rice, beans, chicken, salsa", category: "Burritos", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop", foodType: "non-veg", price: 11.99 },
      { restaurant: restaurants[5]._id, name: "Elote Street Corn", description: "Grilled corn with cotija and lime", category: "Sides", image: "https://images.unsplash.com/photo-1528830693270-44e05f078299?w=400&h=300&fit=crop", foodType: "veg", price: 6.49 },

      { restaurant: restaurants[6]._id, name: "Smoked Brisket", description: "14-hour smoked brisket slices", category: "Mains", image: "https://images.unsplash.com/photo-1559050019-6b509a68e480?w=400&h=300&fit=crop", foodType: "non-veg", price: 19.99 },
      { restaurant: restaurants[6]._id, name: "BBQ Chicken", description: "Char-grilled chicken with house sauce", category: "Mains", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "non-veg", price: 15.99 },
      { restaurant: restaurants[6]._id, name: "Mac and Cheese", description: "Cheddar cream sauce and crumbs", category: "Sides", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", foodType: "veg", price: 7.99 },

      { restaurant: restaurants[7]._id, name: "Pesto Fettuccine", description: "Basil pesto and parmesan", category: "Pasta", image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb0?w=400&h=300&fit=crop", foodType: "veg", price: 14.49 },
      { restaurant: restaurants[7]._id, name: "Chicken Alfredo", description: "Cream sauce with grilled chicken", category: "Pasta", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop", foodType: "non-veg", price: 15.99 },
      { restaurant: restaurants[7]._id, name: "Bruschetta", description: "Tomato, basil, olive oil on toast", category: "Starters", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 8.49 },

      { restaurant: restaurants[8]._id, name: "Green Goddess Bowl", description: "Kale, quinoa, avocado, tahini", category: "Bowls", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", foodType: "veg", price: 12.99 },
      { restaurant: restaurants[8]._id, name: "Spicy Tofu Wrap", description: "Tofu, crunchy slaw, spicy mayo", category: "Wraps", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", foodType: "veg", price: 11.49 },
      { restaurant: restaurants[8]._id, name: "Berry Smoothie", description: "Mixed berries, yogurt, chia", category: "Drinks", image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=400&h=300&fit=crop", foodType: "veg", price: 6.99 },

      { restaurant: restaurants[9]._id, name: "Fish and Chips", description: "Crispy cod with tartar sauce", category: "Mains", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "non-veg", price: 17.99 },
      { restaurant: restaurants[9]._id, name: "Lobster Roll", description: "Butter-toasted roll with lobster", category: "Sandwiches", image: "https://images.unsplash.com/photo-1542353436-312f0b229662?w=400&h=300&fit=crop", foodType: "non-veg", price: 21.99 },
      { restaurant: restaurants[9]._id, name: "Clam Chowder", description: "Creamy chowder with herbs", category: "Soups", image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=400&h=300&fit=crop", foodType: "non-veg", price: 9.49 },

      { restaurant: restaurants[10]._id, name: "Salmon Nigiri", description: "Hand-pressed sushi with fresh salmon", category: "Sushi", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", foodType: "non-veg", price: 13.99 },
      { restaurant: restaurants[10]._id, name: "Spicy Tuna Roll", description: "Tuna, chili mayo, cucumber", category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop", foodType: "non-veg", price: 12.49 },
      { restaurant: restaurants[10]._id, name: "Veggie Tempura", description: "Lightly battered seasonal veggies", category: "Appetizers", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 10.99 },

      { restaurant: restaurants[11]._id, name: "Ribeye Steak", description: "12 oz ribeye with herb butter", category: "Steaks", image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=400&h=300&fit=crop", foodType: "non-veg", price: 26.99 },
      { restaurant: restaurants[11]._id, name: "Grilled Asparagus", description: "Charred asparagus with lemon", category: "Sides", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", foodType: "veg", price: 7.49 },
      { restaurant: restaurants[11]._id, name: "Truffle Mashed Potatoes", description: "Creamy mash with truffle oil", category: "Sides", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", foodType: "veg", price: 8.99 },

      { restaurant: restaurants[12]._id, name: "Buttermilk Pancakes", description: "Stacked pancakes with maple syrup", category: "Breakfast", image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop", foodType: "veg", price: 10.99 },
      { restaurant: restaurants[12]._id, name: "Avocado Toast", description: "Sourdough with smashed avocado", category: "Breakfast", image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb0?w=400&h=300&fit=crop", foodType: "veg", price: 9.99 },
      { restaurant: restaurants[12]._id, name: "Breakfast Burrito", description: "Eggs, cheese, potatoes, salsa", category: "Breakfast", image: "https://images.unsplash.com/photo-1522184216315-dc03f6f1edc2?w=400&h=300&fit=crop", foodType: "non-veg", price: 11.49 },

      { restaurant: restaurants[13]._id, name: "Tonkotsu Ramen", description: "Pork broth, chashu, egg", category: "Ramen", image: "https://images.unsplash.com/photo-1604908177035-0ac1c9c5c2b6?w=400&h=300&fit=crop", foodType: "non-veg", price: 14.99 },
      { restaurant: restaurants[13]._id, name: "Miso Ramen", description: "Miso broth with corn and scallions", category: "Ramen", image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0?w=400&h=300&fit=crop", foodType: "veg", price: 13.49 },
      { restaurant: restaurants[13]._id, name: "Gyoza", description: "Pan-fried dumplings", category: "Appetizers", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", foodType: "non-veg", price: 8.49 },

      { restaurant: restaurants[14]._id, name: "Caesar Salad", description: "Romaine, parmesan, sourdough croutons", category: "Salads", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", foodType: "veg", price: 11.49 },
      { restaurant: restaurants[14]._id, name: "Protein Power Bowl", description: "Greens, grilled chicken, quinoa", category: "Bowls", image: "https://images.unsplash.com/photo-1522184216315-dc03f6f1edc2?w=400&h=300&fit=crop", foodType: "non-veg", price: 13.99 },
      { restaurant: restaurants[14]._id, name: "Mediterranean Salad", description: "Feta, olives, cucumber, lemon vinaigrette", category: "Salads", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 12.49 },

      { restaurant: restaurants[15]._id, name: "Patatas Bravas", description: "Crispy potatoes with spicy aioli", category: "Tapas", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 7.99 },
      { restaurant: restaurants[15]._id, name: "Garlic Shrimp", description: "Sizzling shrimp with garlic and parsley", category: "Tapas", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop", foodType: "non-veg", price: 12.99 },
      { restaurant: restaurants[15]._id, name: "Chicken Paella", description: "Saffron rice with chicken and peppers", category: "Mains", image: "https://images.unsplash.com/photo-1528830693270-44e05f078299?w=400&h=300&fit=crop", foodType: "non-veg", price: 16.99 },

      { restaurant: restaurants[16]._id, name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center", category: "Desserts", image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=300&fit=crop", foodType: "veg", price: 7.49 },
      { restaurant: restaurants[16]._id, name: "Strawberry Cheesecake", description: "Baked cheesecake with berry compote", category: "Desserts", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", foodType: "veg", price: 8.49 },
      { restaurant: restaurants[16]._id, name: "Vanilla Bean Sundae", description: "Ice cream with nuts and caramel", category: "Desserts", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 6.49 },

      { restaurant: restaurants[17]._id, name: "St. Louis Ribs", description: "Smoked ribs with house rub", category: "BBQ", image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400&h=300&fit=crop", foodType: "non-veg", price: 18.99 },
      { restaurant: restaurants[17]._id, name: "Pulled Pork Sandwich", description: "Slow-cooked pork on brioche", category: "Sandwiches", image: "https://images.unsplash.com/photo-1559050019-6b509a68e480?w=400&h=300&fit=crop", foodType: "non-veg", price: 12.99 },
      { restaurant: restaurants[17]._id, name: "Baked Beans", description: "Smoky beans with molasses", category: "Sides", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 5.99 },

      { restaurant: restaurants[18]._id, name: "Ahi Tuna Poke", description: "Fresh ahi, seaweed, sesame", category: "Bowls", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", foodType: "non-veg", price: 15.49 },
      { restaurant: restaurants[18]._id, name: "Teriyaki Chicken Poke", description: "Chicken, pineapple, cucumber", category: "Bowls", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop", foodType: "non-veg", price: 13.99 },
      { restaurant: restaurants[18]._id, name: "Tofu Poke", description: "Marinated tofu, edamame, avocado", category: "Bowls", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", foodType: "veg", price: 12.49 },

      { restaurant: restaurants[19]._id, name: "Detroit Cheese", description: "Classic Detroit-style cheese square", category: "Pizzas", image: "https://images.unsplash.com/photo-1601924582971-6e5ef22367da?w=400&h=300&fit=crop", foodType: "veg", price: 17.49 },
      { restaurant: restaurants[19]._id, name: "Meat Lovers Square", description: "Pepperoni, sausage, bacon", category: "Pizzas", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", foodType: "non-veg", price: 19.49 },
      { restaurant: restaurants[19]._id, name: "Cheesy Breadsticks", description: "Baked breadsticks with garlic butter", category: "Sides", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop", foodType: "veg", price: 7.49 }
    ];

    await MenuItem.insertMany(menuItems);
    console.log("✅ Seed data inserted");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

(async () => {
  await connectDB();
  await seedData();
  await mongoose.connection.close();
})();
