const express = require ("express");

const app = express();

app.get("/getUserData", (req,res) => {
    try{
    //Logic of DB call and get user data

    throw new Error("sdfjjasu");
    res.send("User data sent");
    } catch (err){
    res.status(500).send("Some Error! Please contact support team.");
    }
 });

app.use("/", (err,req,res,next) => {
    if(err){
        //Log your error
        res.status(500).send("something went wrong");
    }
});

app.listen(3000, () => {
    console.log("Sever is successfully  listeing on port number 3000...");
});
