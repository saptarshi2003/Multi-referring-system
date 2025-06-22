const User = require('./models/userModel');
const Purchase = require('./models/purchaseModel');
const Earning = require('./models/earningModel');
const mongoose = require('mongoose');

module.exports = {
  createPurchase: (buyerId, amount) => new Purchase({ buyerId, amount }).save(),
  getUser: (id) => User.findById(id),
  addUser: (data) => new User(data).save(),
  addEarning: (data) => new Earning(data).save(),
  getReferrer: async (id) => {
    const user = await User.findById(id);
    return user?.referrer || null;
  },
  getUserEarnings: (userId) => Earning.find({ userId: new mongoose.Types.ObjectId(userId) }),
};
