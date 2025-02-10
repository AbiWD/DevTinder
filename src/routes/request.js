const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res) =>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //Status vallidation >>>>>>>>>>>>>
  
    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
      return res.
      status(400).
      json({message: "Invalid status type: "+status});

    }

    

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message: "User not found!"});

    }

    // Checking if there is existing ConnectionRequest>>>>>>>>>>>>>

    const existingConnectionRequest = await connectionRequestModel.findOne({
      $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId},
      ],
    });
    if(existingConnectionRequest){
      return res
      .status(400)
      .send({message: "Conection request already exists!!"});
    }


    const connectionRequest = new connectionRequestModel({
      fromUserId, 
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Connection reqeust sen successfully!",
      data,
    })

  }
  catch(err){
    res.status(400).send("ERROR "+ err.message);
  }

//  res.send(user.firstName + "sent the connect request");
});

module.exports = requestRouter;