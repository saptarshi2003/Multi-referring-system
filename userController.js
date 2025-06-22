const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  
    const { name, email, referrerId } = req.body;

     try {
    // If referrerId is provided, check current number of referrals
    if (referrerId) {
      const count = await User.countDocuments({ referredBy: referrerId });
      if (count >= 8) {
        return res.status(400).json({ error: "Referrer has reached the max limit of 8 referrals." });
      }
    }

    const newUser = new User({
      name,
      email,
      referrer: referrerId
    });

   const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
