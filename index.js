const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const port = 3000;

let app = express();
app.use(cors());  

//End Point 1
function carTotal(newItemPrice, cartToatalto) {
  return newItemPrice + cartToatalto;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotalto = parseFloat(req.query.cartTotalto);
  res.send(carTotal(newItemPrice, cartTotalto).toString());
});

//End Point 2
app.get('/membershipDiscount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result;

  if (isMember === 'true') {
    let total = cartTotal * (1 - 0.1);
    result = total.toString();
  } else {
    result = 'no discount is applied';
  }
  res.send(result);
});

//End point 3
app.get('/calculatetax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5 / 100;
  let totalTax = cartTotal * taxRate;

  res.send(totalTax.toString());
});

//End point 4
app.get('/estimateDelivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let result;

  if (shippingMethod === 'Standard') {
    result = distance / 50;
  } else if (shippingMethod === 'Express') {
    result = distance / 100;
  }
  res.send(result.toString());
});

//EndPoint5
app.get('/shippingCost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  let result = weight * distance * 0.1;

  res.send(result.toString());
});

//EndPoint 6
app.get('/loyalitypoint', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * 2;

  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
