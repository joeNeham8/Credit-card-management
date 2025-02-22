const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminsdk.json"); // Download from Firebase console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).send("Invalid token");
    }
};

module.exports = verifyFirebaseToken;
