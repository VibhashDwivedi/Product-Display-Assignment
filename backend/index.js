const express = require('express');
const cors = require('cors');
let laptopData = [];
const app = express();
const port = 8000;

app.use(cors());

const fetchLaptopData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=0&skip=82');
    const data = await response.json();
    laptopData = data.products;
    console.log('Product data fetched successfully');
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

fetchLaptopData();

app.get('/api/products', (req, res) => {
 res.json(laptopData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});