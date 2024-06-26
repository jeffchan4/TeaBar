// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PQjG6AFqUQd4EnyBh5J5pObzHgJMVl0t7KmWc6t2qJ7YZV6HtoKSTSCati7XqgPFRzPKZ6IAaB7hoIi9pJmJghE00VOIipeqr');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());

app.locals.products_and_data={};

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const {line_items}=req.body;
  console.log('backend' + line_items)
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: line_items,
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});
app.get('/list-all-products', async (req,res) => {
  try{
    const products = await stripe.products.list({limit:100});
    const data = products.data;
    const values= Object.values(data); 
    
    for(let i=0; i<values.length; i++){
      const current_product=values[i];
      
      app.locals.products_and_data[current_product['name']]=current_product;  
    }

    

    res.json(app.locals.products_and_data)
  }catch (error){
    console.error('Error fetching products from Stripe:', error);
    res.status(500).send('Internal Server Error');
  }

})

//convert order and quantity to line_items using local products_and_data
app.get('/get-price-id', (req, res) => {
  const order_and_quantity = { 'Cardo': 2, 'Coco Rallado': 5, 'Te Negro Latte': 1 };

  // Assuming req.body contains the data sent from React frontend
  
  const line_items = [];

  Object.keys(order_and_quantity).forEach(product_name => {
    const quant = order_and_quantity[product_name];
    const current_line_item = {};

    // Assuming product_name exists in product_and_data and has an 'id' field
    const product_id = app.locals.products_and_data[product_name]?.default_price; // Access id safely
    console.log(product_id)
    if (product_id) {
      current_line_item['price'] = product_id; // Assuming 'price' is the correct field name
      current_line_item['quantity'] = quant;
      line_items.push(current_line_item);
    }
  });
  // console.log('getpriceid'+line_items)
  res.json(line_items);
});



app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));