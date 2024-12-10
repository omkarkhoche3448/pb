const express = require('express');
const app = express();
const dbConnection = require("./config/db")

const port = 3000;

dbConnection();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});