const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');


router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, currency, country } = req.body;

    
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    
    const lineItems = items.map(item => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        country: country,
        currency: currency
      }
    });

    
    const order = new Order({
      products: items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount,
      currency: currency,
      country: country,
      stripeSessionId: session.id,
      paymentStatus: 'pending'
    });

    await order.save();

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/verify/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    if (session.payment_status === 'paid') {
      await Order.findOneAndUpdate(
        { stripeSessionId: req.params.sessionId },
        { paymentStatus: 'completed' }
      );
    }

    res.json({ status: session.payment_status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;