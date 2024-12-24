const express = require ("express");

const app = express();

app.use("/user",(req,res) => {
    res.send("Yo Yo Yo Yooooooooo");
});

app.post("/user", (req,res) => {
    res.send("Data saved successfully!");

});

app.patch("/user",(req,res) =>{
    res.send("Data updated successfully");

});

app.delete("/user",(req,res) => {
    res.send("Data deleted successfully");
});

app.get("/user",(req,res) =>{
    res.send({firstName:"Abhilash",lastName:"Yoo"});
});

app.get("/",(req,res) => {
    res.send("Helloooooooooooo")
});

app.get("/hello", (req,res) => {
    res.send("Yoooooo")
});

app.listen(3000, () => {
    console.log("Sever is successfully listeing on port number 3000...");
});
