const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Shopify App Proxy expects /apps/auction/*

app.get('/apps/auction/current-bid', (req, res) => {
  res.json({ currentBid: 100 }); // demo bid
});

app.post('/apps/auction/place-bid', (req, res) => {
  const { amount } = req.body;
  if (amount > 100) {
    res.json({ success: true, newBid: amount });
  } else {
    res.json({ success: false, error: "Bid too low" });
  }
});

// Catch-all for debugging
app.all('*', (req, res) => {
  res.status(404).send('Route not found: ' + req.originalUrl);
});

app.listen(port, () => {
  console.log(`Auction backend running on port ${port}`);
});
