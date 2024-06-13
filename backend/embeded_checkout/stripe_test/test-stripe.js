// test-stripe.js

const stripe = require('stripe')('sk_test_51PQjG6AFqUQd4EnyBh5J5pObzHgJMVl0t7KmWc6t2qJ7YZV6HtoKSTSCati7XqgPFRzPKZ6IAaB7hoIi9pJmJghE00VOIipeqr');

async function createTestPaymentIntent() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // Amount in cents ($20.00)
      currency: 'usd',
      payment_method_types: ['card'],
    });

    console.log('PaymentIntent created:', paymentIntent);
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
  }
}

createTestPaymentIntent();
