import express from "express";
import notesRoute from "./routes/notesRoute.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import rateLimit from "./config/upstash.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config()

const app = express();

// ORDER IS IMPORTANT

app.use(cors(
    { origin: "http://localhost:5173" }
))
//middlewares
app.use(express.json())// this middleware will parse JSON bodies:req.body so that we can access req body

app.use(rateLimiter)


// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoute); // we build seperate route each category

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started on PORT:5001")
    });
})


