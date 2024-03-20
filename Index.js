const express = require('express')
const cors = require("cors")
const { default: mongoose } = require('mongoose');
const Order = require('./src/models/Order');
const app = express();
require('dotenv').config();


mongoose.connect(process.env.MONGO_UR)
const conn = mongoose.connection

conn.once('open' , () => {
  console.log('successfully database connected');
})
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }));

// Handle CORS options requests
app.options('*', cors());

app.use(express.json());


app.get("/test" , (req,res) =>{
    res.json("hello world")
})

app.post('/address_user', async (req, res) => {
  try {
    // Generate orderId, orderName, productId, and productName
    const orderId = Date.now() + "shopapp" + Math.random().toString(); // Implement your own logic to generate orderId
    const orderName = "shopappOrder" + Math.random().toString(); // Provide your own order name
      // Implement your own logic to generate productId


    // Extract other data from request body
    const { fullName, number, email, streetAddress, city, state, postalCode, country, additionalInfo ,items} = req.body;

    console.log('Extracted Data:', {
      orderId,
      orderName,
      fullName,
      number,
      email,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      additionalInfo,
      items // This will log the entire items array for inspection
    });
    const itemId = items.map(item => item.id);
    const itemPrice = items.map(item => item.price)
    // Create a new order document with manually provided fields
    const newOrder = new Order({
      orderId,
      orderName,
      itemId,
      itemPrice,
      fullName,
      number,
      email,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      additionalInfo,
    });

    // Save the order to the database
    await newOrder.save();

    // Send a success response
    res.status(200).json({ message: 'Order saved successfully' });
  } catch (err) {
    // Handle errors
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/user_orders/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    // Assuming you have an Order model in your MongoDB schema
    const userOrders = await Order.find({ email: userEmail });
    if (!userOrders) {
      return res.status(404).json({ error: 'Orders not found for this user' });
    }
    res.status(200).json({ orders: userOrders });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Order.find({}, 'itemId orderId email number streetAddress postalCode itemPrice'); // Modify the fields as per your Order model
    res.status(200).json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  


app.listen(4000, () =>{
    console.log("successfully listening on port 4000");
});

