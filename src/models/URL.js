const URL = {
    GET_LONG_URL: "SELECT longURL FROM shortenedURLs where shortURL = ?",
    INSERT_URL: "INSERT INTO shortenedURLs (shortURL, longURL) VALUES (?, ?)",
};

export default URL;
