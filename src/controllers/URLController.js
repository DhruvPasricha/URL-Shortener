import database from "../config/db.js";
import URL from "../models/URL.js";

export const getRandomString = (length) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; ++i) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const isShortURLPresent = async (shortURL) => {
    try {
        const [rows] = await database.execute(URL.GET_LONG_URL, [shortURL]);
        return rows && rows[0];
    } catch (error) {
        return false;
    }
};

export const shortenURL = async (request, response) => {
    let { longURL } = request.body;
    if (!longURL.match(/^(http|https)/i)) {
        longURL = "//" + longURL;
    }

    let newShortURL = "";
    do {
        newShortURL = getRandomString(5);
    } while (await isShortURLPresent(newShortURL));

    try {
        await database.execute(URL.INSERT_URL, [newShortURL, longURL]);
        response.status(201).json({ shortURL: newShortURL });
    } catch (error) {
        console.log(error);
        response.status(500).send("Something went wrong");
    }
};

export const getOriginalURL = async (request, response) => {
    const shortURL = request.params.shortURL;
    console.log("getting original url for", shortURL);
    try {
        const [rows] = await database.execute(URL.GET_LONG_URL, [shortURL]);
        console.log(rows);
        if(rows && rows[0])
            response.status(200).send(rows[0]);
        else
            response.status(404).send("Not found");
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
};
