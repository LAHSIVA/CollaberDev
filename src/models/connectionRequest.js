const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: "{VALUE} is incorrect Status Type"
        }
        
    }
},{timestamps:true}
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save",function(next){
            const connectionRequest=this;
            // check if from_userid is same as to_userid
            if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
                throw new Error("fromUserId and toUserId cannot be same");
            }
            next();
        });

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports=ConnectionRequestModel;