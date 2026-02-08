# 🏍️ MotoHunt - Premium Motorcycle Aggregator

![MotoHunt](https://img.shields.io/badge/MotoHunt-v1.0.0-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)

**MotoHunt** is a modern, full-stack web application designed for motorcycle enthusiasts in India. It features advanced search, side-by-side comparisons, and seamless test ride bookings—all wrapped in a premium dark-mode interface.

## ✨ Features

- 🔥 **Trending Bikes Dashboard** - Discover the hottest motorcycles
- 🔍 **Advanced Search & Filtering** - Filter by price, engine CC, brand, and type
- ⚖️ **Side-by-Side Comparison** - Compare specs with visual highlights
- 📅 **Test Ride Booking** - Book test rides with random dealer assignment
- 👤 **User Authentication** - Secure login/register with session persistence
- 📊 **User Dashboard** - View bookings and profile information
- 🎨 **Premium Dark Mode UI** - Sleek design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management for authentication

### Backend
- **Node.js + Express.js** - RESTful API
- **SQLite** - Lightweight relational database
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Credit Card fraud detection Website"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file (or copy from `.env.example`):
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DATABASE_PATH=./database/motohunt.db
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

The API will run at `http://localhost:5000`. The database will be automatically created and seeded on first run.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The frontend will run at `http://localhost:3000`.

## 🚀 Usage

### User Flow
1. **Register**: Create an account via `/register`
2. **Login**: Sign in at `/login` (session persists on refresh)
3. **Browse**: Explore bikes at `/bikes` with advanced filters
4. **Compare**: Compare two bikes at `/compare`
5. **Book**: Book a test ride on any bike detail page
6. **Dashboard**: View your bookings at `/dashboard`

### Test Accounts
After seeding, you can use these test credentials:

**Admin Account:**
- Email: `admin@motohunt.com`
- Password: `password123`

**Customer Account:**
- Email: `test@example.com`
- Password: `password123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Bikes
- `GET /api/bikes` - Get all bikes (supports filters)
- `GET /api/bikes/trending` - Get trending bikes
- `GET /api/bikes/:id` - Get bike by ID
- `GET /api/bikes/compare/data?id1=&id2=` - Compare two bikes
- `PATCH /api/bikes/:id/trending` - Toggle trending (admin only)

### Brands
- `GET /api/brands` - Get all brands

### Dealers
- `GET /api/dealers` - Get all dealers

### Test Rides
- `POST /api/test-rides` - Book a test ride (protected)
- `GET /api/test-rides/user/:userId` - Get user's bookings (protected)

## 🗄️ Database Schema

### Tables
- **brands** - Motorcycle manufacturers
- **bikes** - Motorcycle inventory with specs
- **dealers** - Showroom locations
- **users** - User accounts
- **test_rides** - Booking records

### Seed Data
The database is pre-populated with:
- 6 popular brands (Honda, Royal Enfield, Triumph, Yamaha, KTM, Bajaj)
- 8 motorcycle models with realistic pricing
- 3 dummy dealers across major cities

## 🎨 Features Showcase

### Premium UI
- Gradient backgrounds and buttons
- Smooth hover effects and transitions
- Custom scrollbar styling
- Responsive design (mobile, tablet, desktop)
- Dark mode optimized

### Smart Search
- Price range slider
- Engine capacity filters (0-200cc, 200-400cc, 400cc+)
- Brand and body type dropdowns
- Real-time filter updates

### Comparison Tool
- Side-by-side specification table
- Visual highlighting (green for better spec)
- Price, CC, and type comparison

## 🔒 Security
- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens stored in httpOnly cookies
- Protected routes with authentication middleware
- CORS configured for frontend-backend communication

## 📝 Development Notes

### Session Persistence
Users remain logged in across page refreshes thanks to:
1. JWT tokens stored in httpOnly cookies (7-day expiry)
2. AuthContext checks authentication on app load
3. `/api/auth/me` endpoint validates session

### Error Handling
- Form validation on frontend
- API error responses with descriptive messages
- Loading states for all async operations

## 🚧 Future Enhancements
- Email verification
- Advanced admin panel
- Real dealer integration
- Payment gateway for bookings
- User reviews and ratings
- Bike wishlists

## 📄 License
MIT License - feel free to use for learning and portfolio projects

## 🤝 Contributing
This is a portfolio/learning project. Feedback and suggestions are welcome!

## 💬 Support
For issues or questions, please open an issue in the repository.

---

**Made with ❤️ for motorcycle enthusiasts**
