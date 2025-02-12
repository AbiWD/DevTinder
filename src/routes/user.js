const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl gender age skills";

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received",userAuth, async (req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequest.find({
            toUserId: loggedInUser._id,

        }).populate("fromUserId", USER_SAFE_DATA);


     res.json({message: "Data sent successfully", data: connectionRequests});

    }catch(err){
        req.statusCode(400).send("ERROR: "+ err.message);
    }
});


userRouter.get("/user/connection",userAuth,async(req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId",USER_SAFE_DATA);

        const data = connectionRequests.map((row) => row.fromUserId);
        
        res.json({ data });

    }catch(err){
        res.status(400).send({message: err.message});
    }
});




moduel.exprorts = userRouter;