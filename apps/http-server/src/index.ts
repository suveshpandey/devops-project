import express from "express"
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hi there.");
})
app.get("/health", (req, res) => {
    res.send("the health of http-server is ok.");
})
app.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await client.user.create({
        data: {
            username,
            password
        }
    });
    if(user) {
        res.status(201).json({
            message: "signup successful",
            id: user.id
        })
    }
    }
    catch(error) {
        res.status(500).json({
            message: "signup failed",
            error: error
        })
    }
})

app.listen(8080,() => console.log("http server is running on port 8080..."));