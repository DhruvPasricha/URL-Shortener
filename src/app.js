import express from "express";
import cors from "cors";
import { getRandomString, getOriginalURL, shortenURL } from "./controllers/URLController.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get("/", (_request, response) => {
    response.send("Working");
});

app.get("/ping", (_request, response) => {
    response.send(getRandomString(10));
});

app.get("/getURL/:shortURL", getOriginalURL);
app.post("/api/shorten", shortenURL);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
