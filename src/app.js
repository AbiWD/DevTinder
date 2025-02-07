const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req,res) => {
  //Validation of data
  validateSignUpData (req); 
  
  const {firstName, lastName, emailId,password} = req.body;

  //Encrytpt the password
  const passwordHash = await bcrypt.hash(password,10);
 

  // Creating a new instance of the User model

  const user = new User({
    firstName, lastName,emailId, password: passwordHash
  });

  try {
    await user.save();
    res.send ("User added successfully.");
  }catch(err){
    res.status(400).send("ERROR : "+err.message);
  }  
 });

app.post("/login",async (req, res) =>{
  try{
    const {emailId,password} = req.body;


    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(isPasswordValid){
      // Create a JWT token

      const token = await jwt.sign({_id: user._id}, "DEV@tinder#123");

      // Add the token to cookie and send the response  back to user
      res.cookie("token", token,{ httpOnly:true });

      res.send("Login Successful!!");
    }else{
      throw new Error ("Invalid credentials");
    }


  }catch(err){
    res.status(400).send("ERROR: "+ err.message); 
  }
});


app.get("/profile", userAuth, async (req,res) =>{

  try{
  
  const  user = req.user;

  res.send(user);}
  catch(err){
  res.status(400).send("ERROR: "+ err.message); 
  }
});

app.post("/sendConnectionRequest",userAuth, async(req,res) =>{
  const user =  req.user;
  //Sending a connection request 
  console.log("Sending a conneciton request");
  res.send(user.firstName+" sent the connection request");
});


 // Get user by email>>>>>
 app.get("/user", async (req, res) =>{
  const userEmail = req.body.emailId;
   
  try{
    const user = await User.find({emailId: userEmail});
    res.send(user);
  }
  catch(err){
    res.status(400).send("Something went wrong!");
  }
 });


 //Feed Api - Get / feed - get all the users from the database
 app.get("/feed",async (req, res) =>{

  try {
    const users = await User.find({});
    res.send(users);
  }catch(err){
    res.status(400).send("Something went wrong!");
  }
 });

//Delete user api>>>>> Delete user by Id >>>>>>..
app.delete("/user", async (req, res) => {

  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");

  }catch(err){
    res.status(400).send("Something went wrong!");
  }
})


//Update data of User>>>>>>>>>>
app.patch("/user/:userId",async (req,res) =>{
  const userId = req.params?.userId;
  const data = req.body;


  try{
    const ALLOWED_UPDATES = [
      "photoUrl","about","gender","age","skills",
    ];
  
    const isUpdateAllowed = Object.keys(data).every((k) => 
    ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error ("Update not allowed");
    }
    if(data?.skills.length > 10 ){
      throw new Error("Skills cannot be more than 10")
    }

    await User.findByIdAndUpdate({_id: userId}, data,{
      returnDocument:"after",
      runValidators: true,
    }); 
    res.send("User updated successfully");
  }catch(err){
    res.status(400).send("Update failed!" + err.message);
  }
});


connectDB()
.then(() => {
  console.log("Database connection established...");
  app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
  });
})
.catch((err) =>{
  console.error("Server cannot be connected!!");
});