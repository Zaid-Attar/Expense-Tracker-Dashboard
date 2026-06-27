import ratelimiter from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimiter.limit(req.ip);
        if (!success) {
        return res.status(429).json({ error: "Toooo many requests" });
        }
        next();
    } catch (error) {
        console.error("Error occurred while checking rate limit:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
};

export default rateLimiter;