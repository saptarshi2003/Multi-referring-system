const db = require('../db');
const { sendEarningNotification } = require('../sockets/websocket');

async function distributeEarnings(buyerId, amount, transactionId) {
  const updates = [];
  let refId = await db.getReferrer(buyerId);
  let level = 1;

  console.log('Initial referrer of buyer:', refId);

  while (refId && level <= 2) {
    const percentage = level === 1 ? 0.05 : 0.01;
    const earnAmount = parseFloat((amount * percentage).toFixed(2));

    const data = {
      userId: refId,
      fromUser: buyerId,
      level,
      amount: earnAmount,
      transactionId,
      createdAt: new Date()
    };

    console.log(`Level ${level} - Adding earning:`, data);

    await db.addEarning(data); // Confirm this inserts into MongoDB
    sendEarningNotification(refId.toString(), earnAmount, buyerId, level);
    updates.push(data);

    refId = await db.getReferrer(refId);
    level++;
  }
  console.log(`Distributing earnings for buyer ${buyerId}, amount: ${amount}`);
  console.log(`Referrer at level ${level}: ${refId}`);
  
  return updates;
}
module.exports = { distributeEarnings };
