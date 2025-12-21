require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/FoodDelivery';

async function createFoodCategories() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Create food_items collection with sample data
    const foodItemsCollection = db.collection('food_items');
    await foodItemsCollection.deleteMany({});
    
    const foodItems = [
      {
        CategoryName: "Biryani",
        name: "Chicken Biryani",
        img: "https://images.unsplash.com/photo-1563379091339-03246963d7d3?w=400&h=300&fit=crop",
        options: [
          { Half: "130", Full: "230" }
        ],
        description: "Aromatic basmati rice with tender chicken pieces"
      },
      {
        CategoryName: "Pizza",
        name: "Margherita Pizza",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
        options: [
          { Half: "120", Full: "210" }
        ],
        description: "Classic pizza with fresh mozzarella and basil"
      },
      {
        CategoryName: "Burger",
        name: "Classic Beef Burger",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        options: [
          { Single: "150", Double: "220" }
        ],
        description: "Juicy beef patty with fresh vegetables"
      },
      {
        CategoryName: "Starter",
        name: "Chicken Wings",
        img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=300&fit=crop",
        options: [
          { "6 Pcs": "180", "12 Pcs": "320" }
        ],
        description: "Crispy chicken wings with spicy sauce"
      },
      {
        CategoryName: "Rolls",
        name: "Chicken Roll",
        img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
        options: [
          { Regular: "90", Large: "140" }
        ],
        description: "Spiced chicken wrapped in soft bread"
      },
      {
        CategoryName: "Dessert",
        name: "Chocolate Cake",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        options: [
          { Slice: "80", Full: "600" }
        ],
        description: "Rich chocolate cake with creamy frosting"
      },
      {
        CategoryName: "Pure Veg",
        name: "Paneer Butter Masala",
        img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
        options: [
          { Half: "140", Full: "240" }
        ],
        description: "Cottage cheese in rich tomato gravy"
      },
      {
        CategoryName: "Pasta",
        name: "Spaghetti Carbonara",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
        options: [
          { Regular: "160", Large: "240" }
        ],
        description: "Classic Italian pasta with creamy sauce"
      },
      {
        CategoryName: "Noodles",
        name: "Chicken Hakka Noodles",
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        options: [
          { Half: "110", Full: "190" }
        ],
        description: "Stir-fried noodles with chicken and vegetables"
      },
      {
        CategoryName: "Pure Veg",
        name: "Dal Makhani",
        img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        options: [
          { Half: "120", Full: "200" }
        ],
        description: "Creamy black lentils cooked overnight"
      }
    ];

    await foodItemsCollection.insertMany(foodItems);
    console.log(`✅ Created ${foodItems.length} food items`);

    // Create Categories collection
    const categoriesCollection = db.collection('Categories');
    await categoriesCollection.deleteMany({});
    
    const categories = [
      { CategoryName: "Biryani" },
      { CategoryName: "Pizza" },
      { CategoryName: "Burger" },
      { CategoryName: "Starter" },
      { CategoryName: "Rolls" },
      { CategoryName: "Dessert" },
      { CategoryName: "Pure Veg" },
      { CategoryName: "Pasta" },
      { CategoryName: "Noodles" }
    ];

    await categoriesCollection.insertMany(categories);
    console.log(`✅ Created ${categories.length} categories`);

    console.log('✅ Food categories and items created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating food data:', error);
  } finally {
    mongoose.connection.close();
  }
}

createFoodCategories();