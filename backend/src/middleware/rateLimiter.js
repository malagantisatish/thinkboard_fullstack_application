import rateLimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {
    console.log("req", req)
    try {
        const { success } = await rateLimit.limit("my-limit-key"); // my-limit-key should unique mean we can use userid to resistrict specific user
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later"
            })
        }
        next()

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }


}


export default rateLimiter