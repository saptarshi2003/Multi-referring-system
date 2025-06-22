const db = require('../db');
const { distributeEarnings } = require('./earningsController');

async function handleNewPurchase(req, res) {
  console.log("Received purchase body:", req.body); // <--

  const { buyerId, amount } = req.body;
  if (!buyerId || !amount) return res.status(400).json({ error: 'Missing buyerId or amount' });

  if (amount < 1000) return res.status(400).json({ error: 'Minimum purchase ₹1000 required' });

  const purchase = await db.createPurchase(buyerId, amount);
  await distributeEarnings(buyerId, amount, purchase._id);

  res.json({ success: true, purchase });
}


module.exports = { handleNewPurchase };
