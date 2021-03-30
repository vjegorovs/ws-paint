import dotenv from "dotenv";
import express from "express";
import { defaultRoute } from "./routes/defaultRoute";

dotenv.config();

const port: String | undefined = process.env.SERVER_PORT || "3333";

const app: express.Application = express();

app.use((req, res, next) => {
    // cors stuff, careful with *
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    next();
});

app.use(defaultRoute);
app.listen(port, () => {
    console.log(`Backend initiated successfully on port ${port}`);
});