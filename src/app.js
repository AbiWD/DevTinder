const express = require ("express");

const app = express();

app.use(
    "/user",
    (req,res,next) => {
        console.log("Handling the route user 1");
        // res.send("Yo Yo ");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2");
        // res.send("Yo Yo Yooooooooo");
        next();
    },
    (req,res) => {
        console.log("Handling the route user 3");
        res.send("Yo Yo Yooo Noooooo");
    }
);


app.listen(3000, () => {
    console.log("Sever is successfully listeing on port number 3000...");
});
