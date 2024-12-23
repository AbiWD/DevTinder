const express = require ("express");

const app = express();

app.use((req,res) => {
    res.send("Helloooooooooooo Yoooooo")
});

app.listen(3000, () => {
    console.log("Sever is successfully listeing on port number 3000...");
});