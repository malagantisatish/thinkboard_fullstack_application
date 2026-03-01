import express from "express";
import notesRoute from "./routes/notesRoute.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"


dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve()

// ORDER IS IMPORTANT


if (process.env.NODE_ENV !== "production") {
    app.use(cors(
        { origin: "http://localhost:5173" }
    ))
}


//middlewares
app.use(express.json())// this middleware will parse JSON bodies:req.body so that we can access req body

app.use(rateLimiter)


// app.use((req, res, next) => {
//     console.log(`req method is ${req.method} & req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoute); // we build seperate route each category


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:5001")
    });
})


