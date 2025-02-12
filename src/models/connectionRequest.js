const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",// reference to the user collection 
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type:String,
        required: true,
        enum: {
            values: ["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorect status type`,
        },
    },

    },
    {
    timestamps: true,
    }  

);


connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save",function(next) {
    const connectionRequest = this;
    //Checking if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot sned connection request to yourself");
    }
    next(); 
});

const connectionRequestModel = mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequestModel; 