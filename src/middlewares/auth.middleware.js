import jwt from "jsonwebtoken";
import { getUserById } from "../servies/index.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header missing" });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer") {
            return res.status(401).json({ error: "Wrong authorization type" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        console.log({ decoded });

        const user = await getUserById(decoded.sub); 

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
