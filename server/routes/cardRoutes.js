const express = require("express");
const router = express.Router();
const User = require("../models/card");

router.post("/add-card", async (req, res) => {
    const { uid, cardNumber, cardHolder, expiryDate, cvv, bank } = req.body;

    let user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newCard = {
        cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Mask card number
        cardHolder,
        expiryDate,
        cvv,
        bank,
    };

    user.cards.push(newCard);
    await user.save();

    res.json({ message: "Card added successfully", card: newCard });
});

// Route to Fetch All Cards for a User
router.get("/get-cards/:uid", async (req, res) => {
    const user = await User.findOne({ uid: req.params.uid });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cards: user.cards });
});

module.exports = router;
