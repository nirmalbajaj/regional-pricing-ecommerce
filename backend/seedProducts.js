// backend/seedProducts.js
// Run this file once to add sample products: node seedProducts.js

const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    basePrice: 5999,
    category: 'Electronics',
    stock: 15
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    basePrice: 8999,
    category: 'Electronics',
    stock: 20
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with USB charging port',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    basePrice: 2499,
    category: 'Accessories',
    stock: 30
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');
    
    await Product.insertMany(products);
    console.log('✅ Sample products added');
    
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });