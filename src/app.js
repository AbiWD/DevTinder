const express = require ("express");

const app = express();

const {adminAuth, userAuth } = require("./Middlewares/auth");

app.get("/admin",adminAuth);

app.post("/user/login",(req,res) => {
    res.send("User logged in successfully");
});

app.get("/user",userAuth, (req,res) => {
    res.send("User is here");
});

app.get("/admin/getAllData",(req,res) => {
   res.send("All data sent");
});

app.get("/admin/deleteUser",(req,res) => {
    res.send("Deleted a User");
 });


app.listen(3000, () => {
    console.log("Sever is successfully  listeing on port number 3000...");
});
