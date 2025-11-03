# RegionalShop - Multi-Currency E-Commerce Platform

A full-stack e-commerce application featuring regional pricing in multiple currencies with integrated Stripe payment processing. Built as part of a technical assessment demonstrating proficiency in the MERN stack.

## 🌍 Live Demo

- **Frontend**: [https://regional-pricing-ecommerce.vercel.app](https://regional-pricing-ecommerce.vercel.app)
- **Backend API**: [https://regional-pricing-ecommerce.onrender.com](https://regional-pricing-ecommerce.onrender.com)

## ✨ Features

### Core Functionality
- **Regional Pricing**: Automatic currency conversion based on user location
  - India → INR ₹
  - USA → USD $
  - UK → GBP £
- **Manual Country Selection**: Users can manually switch between supported countries
- **Stripe Integration**: Secure payment processing with Stripe Checkout
- **Responsive Design**: Mobile-first approach ensuring seamless experience across devices
- **Real-time Cart Management**: Add/remove products with live total calculation

### Technical Highlights
- RESTful API architecture
- MongoDB database for product and order management
- Environment-based configuration for secure credential management
- CORS-enabled for cross-origin requests
- Error handling and input validation

## 🛠️ Tech Stack

### Frontend
- **React** (v18+) - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Router** (if applicable) - Client-side routing
- **CSS3** - Styling

### Backend
- **Node.js** (v18+) - Runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Stripe** - Payment processing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### DevOps & Hosting
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **GitHub** - Version control

## 📋 Prerequisites

Before running this project locally, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Stripe account (test mode credentials)
- Git

## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nirmalbajaj/regional-pricing-ecommerce.git
cd regional-pricing-ecommerce
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add the following to `backend/.env`:**

```env
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
PORT=5001
```

**Start the backend server:**

```bash
npm run dev
```

Backend will run on `http://localhost:5001`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Add the following to `frontend/.env`:**

```env
VITE_API_URL=http://localhost:5001/api
```

**Start the frontend development server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Seed Sample Products (Optional)

```bash
# In backend directory
node seedProducts.js
```

This will populate your database with sample products.

## 🗂️ Project Structure

```
regional-pricing-ecommerce/
├── backend/
│   ├── models/
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── paymentRoutes.js
│   │   └── productRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── seedProducts.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode) | `sk_test_...` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `PORT` | Backend server port | `5001` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001/api` |

## 🧪 Testing the Application

### Test Payment with Stripe

Use these test card details:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry Date**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Testing Different Currencies

1. Visit the homepage
2. Use the currency/country selector dropdown
3. Observe price changes for all products
4. Proceed to checkout to test payment in that currency

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product (for seeding)

### Payments

- `POST /api/payment/create-checkout-session` - Create Stripe checkout session
- `GET /api/payment/verify/:sessionId` - Verify payment status

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Backend (Render)

1. Create new Web Service in Render
2. Connect GitHub repository
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables (MONGO_URI, STRIPE_SECRET_KEY, CLIENT_URL, PORT)
5. Deploy

## 🐛 Known Issues & Limitations

- **Render Free Tier**: Backend goes to sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.
- **Static Exchange Rates**: Currently uses predefined exchange rates. Future enhancement could integrate live exchange rate APIs.
- **Limited Currency Support**: Currently supports INR, USD, and GBP only.


## 🤝 Contributing

This is an assessment project and is not open for contributions. However, feel free to fork and modify for your own learning purposes.

## 📄 License

This project is created for educational purposes as part of a technical assessment.

## 👨‍💻 Author

**Nirmal Bajaj**

- GitHub: [@nirmalbajaj](https://github.com/nirmalbajaj)

## 📞 Support

For any queries or issues, please open an issue in the GitHub repository.

---

**Note**: This project was built as part of a technical assessment to demonstrate proficiency in full-stack development using the MERN stack, payment gateway integration, and deployment practices.
