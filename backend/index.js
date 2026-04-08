require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ProductsRoutes = require('./routes/products.js');

const app = express();

// ✅ مهم: CORS مضبوط
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("السلام عليكم ورحمة الله وبركاته");
});

// logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/products', ProductsRoutes);

// ✅ مهم: اسم المتغير لازم يطابق Render
const DB_URI = process.env.MONGODB_URL;

const PORT = process.env.PORT || 4000;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log(`CONNECTED && Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });