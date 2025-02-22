const User = require("../models/user");

const registerUser = async (req, res) => {
    const { uid, email, name } = req.body;
    try {
        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({ uid, email, name });
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

module.exports = { registerUser };
