# 🍕 Food Delivery App

A learning project built with the MERN stack to explore food delivery platform concepts including basic user authentication, restaurant browsing, and cart functionality.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## 🌟 Current Features

### 🔐 Basic Authentication
- User registration and login with JWT
- Password hashing for security
- Basic protected routes

### 🏪 Restaurant Browsing
- View available restaurants
- Browse menu items
- Basic restaurant information display

### 🛒 Shopping Cart (In Development)
- Add items to cart
- Basic cart functionality
- Local storage integration

### 🎨 User Interface
- Responsive design using Bootstrap
- React-based component structure
- Basic navigation

## 🛠️ Technology Stack

### Frontend
- **React** - Frontend library
- **React Router** - Routing
- **Bootstrap** - CSS framework
- **React Context** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **Nodemon** - Auto-restart development server
- **Concurrently** - Run multiple commands
- **Express Validator** - Input validation
- **Dotenv** - Environment variables

## 📁 Project Structure

```
food-delivery-app/
├── backend/                 # Backend API server
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── menuController.js
│   │   └── orderController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   └── validator.js
│   ├── models/            # Database schemas
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   └── Orders.js
│   ├── routes/            # API routes
│   │   ├── Auth.js
│   │   ├── Restaurant.js
│   │   ├── Menu.js
│   │   └── Order.js
│   ├── seedData.js        # Database seeding
│   └── index.js           # Server entry point
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   │   ├── Navbar.js
│   │   ├── CartContext.js
│   │   └── Footer.js
│   ├── screens/           # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── RestaurantList.js
│   │   ├── RestaurantDetail.js
│   │   ├── Cart.js
│   │   └── Payment.js
│   └── App.js             # Main app component
└── public/                # Static files
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
```

### 3. Environment Setup
Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/FoodDelivery
JWT_SECRET=your-secret-key
REQUIRE_RESTAURANT_APPROVAL=false
```

### 4. Database Setup
```bash
# Start MongoDB service
mongod

# Seed the database with sample data
cd backend
node seedData.js
```

### 5. Run the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

#### Or run separately:

**Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Frontend Application:**
```bash
npm start
# App runs on http://localhost:3000
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Restaurants
- `GET /api/restaurant/all` - Get all restaurants
- `GET /api/restaurant/:id` - Get restaurant details
- `POST /api/restaurant/create` - Create new restaurant (Auth required)

### Menu
- `GET /api/menu/restaurant/:id` - Get restaurant menu
- `POST /api/menu/item` - Add menu item (Auth required)

### Orders
- `POST /api/order/place` - Place new order (Auth required)
- `GET /api/order/user` - Get user orders (Auth required)

## 🎯 Current Status

This is a learning project and is currently under development. Basic functionality includes:

### Working Features:
- User registration and authentication
- Restaurant browsing
- Menu display
- Basic cart functionality

### In Development:
- Order processing
- Payment integration
- Advanced cart management
- User dashboard

## 🧪 Testing Credentials

### Sample User Account
- **Email:** john@example.com
- **Password:** 123456
- **Role:** Customer

### Sample Restaurant Owner
- **Email:** restaurant@example.com
- **Password:** 123456
- **Role:** Restaurant Owner

## 📱 Screenshots

![App Screenshot 1](Screenshots/1.jpg)
![App Screenshot 2](Screenshots/2.jpg)
![App Screenshot 3](Screenshots/3.jpg)

## 🔮 Planned Features

The following features are planned for future development:

- **Order Processing** - Complete order placement and tracking
- **Payment Integration** - Multiple payment options
- **Restaurant Dashboard** - Management interface for restaurant owners  
- **Advanced Search** - Filter by cuisine, price, ratings
- **User Reviews** - Rating and review system
- **Real-time Updates** - Live order status tracking
- **Mobile Optimization** - Enhanced mobile experience

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards:
- Use ESLint for code formatting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hard Patel**
- GitHub: [@Hard2003](https://github.com/Hard2003)

## 🙏 Acknowledgments

This project was built as a learning exercise using:
- **React** for the frontend
- **Node.js & Express** for the backend  
- **MongoDB** for the database
- **Bootstrap** for styling

---

**A Learning Project by Hard Patel**


## Features-

- Allow users to browse food items.
- Allow users to place orders.
- Allow admin users to manage orders.

## Architecture-

The food delivery app is built using the MERN stack. The app consists of several components, including the Home screen,My Orders screen, Cart screen, Login and Logout screen and Admin screen. 

The Home screen displays the list of food items, and includes a search bar and number of items to be ordered options.The Home screen displays the list of items in the menu, and allows the user to add items to their cart. The Cart screen displays the list of items in the user's cart, and allows the user to place an order. The Order screen displays the details of the user's order.The Admin screen displays the management interface for menus and orders.

## Design-

The design of the app is modern and user-friendly, with a focus on simplicity and ease of use. The app uses a clean and minimalist design, with a black background and simple typography. The app also uses clear and concise language, with straightforward labels and instructions.

The Home screen displays the list of food items in a grid view, with each food item displayed as a card.The Cart screen displays the list of items in the user's cart, with the total price and checkout button displayed prominently. The Order screen displays the details of the user's order.The Admin screen displays the management interface for orders and cart, with clear and intuitive navigation and controls.

<!-- The app is designed to be scalable and modular, with a clean and organized codebase. The backend API is implemented using Express.js and Mongoose, with separate controllers and models for each component. The frontend is implemented using React, with separate components for each screen and functionality.-->

## Usage-



## 📖 About This Project

This is a learning project built to understand the MERN stack and explore food delivery app concepts. The project demonstrates basic web development skills and common e-commerce patterns.


## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (for database)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FoodDeliveryApp-main
```

### 2. Backend Setup

Navigate to the backend directory and configure:

```bash
cd backend
```

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

To get your MongoDB connection string:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (if you haven't already)
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<password>` with your database password
5. Replace `<dbname>` with `FoodDelivery` or your preferred database name

Install backend dependencies:

```bash
npm install
```

### 3. Frontend Setup

Navigate back to the root directory and install frontend dependencies:

```bash
cd ..
npm install --legacy-peer-deps
```

*Note: `--legacy-peer-deps` is used to resolve Material-UI compatibility issues with React 18.*

### 4. Database Setup

Make sure to create two collections in your MongoDB database:
- `food_items` - For storing food items
- `Categories` - For storing food categories

You can manually add sample data or create an admin panel to manage these.

## Steps to Run the App 

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
The backend server will start on http://localhost:5000

**Terminal 2 - Frontend (React):**
```bash
npm start
```
The React app will start on http://localhost:3000

### Option 2: Run Both Concurrently (Recommended)

If you want to run both frontend and backend together:

```bash
npm install -g concurrently
npm run dev
```

This will start both the backend server and React app simultaneously.

### Individual Commands

- **`npm start`** - Runs the React frontend in development mode
- **`npm run server`** - Runs the backend server with nodemon
- **`npm run dev`** - Runs both frontend and backend concurrently
- **`npm run build`** - Creates a production build of the React app

### Accessing the Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Verify your MongoDB connection string in `backend/.env`
- Make sure your IP address is whitelisted in MongoDB Atlas
- Check that your database user has proper permissions

**2. Port Already in Use**
- If port 5000 or 3000 is already in use, you can change them:
  - Backend: Modify `PORT` in `backend/.env`
  - Frontend: Create a `.env` file in root with `PORT=3001`

**3. CORS Error**
- Ensure `FRONTEND_URL` in `backend/.env` matches your React app URL
- Default is `http://localhost:3000`

**4. Module Not Found Errors**
- Run `npm install --legacy-peer-deps` in the root directory
- Run `npm install` in the backend directory

### Security Notes

- Never commit your `.env` file to version control
- Change the `JWT_SECRET` to a strong random string
- Use environment-specific configuration for production

## Project Structure

```
FoodDeliveryApp/
├── backend/
│   ├── middleware/
│   │   └── fetchdetails.js
│   ├── models/
│   │   ├── Orders.js
│   │   └── User.js
│   ├── Routes/
│   │   └── Auth.js
│   ├── .env (create this)
│   ├── db.js
│   ├── index.js
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Carousel.js
│   │   ├── ContextReducer.js
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── screens/
│   │   ├── Cart.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── MyOrder.js
│   │   └── Signup.js
│   ├── App.js
│   └── index.js
├── public/
├── .gitignore
├── package.json
└── README.md
```

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Screenshot-


