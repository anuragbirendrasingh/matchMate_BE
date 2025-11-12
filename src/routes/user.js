const express  = require("express") ;
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionsRequests");
const User = require("../models/User");
// const connectionsRequests = require("../models/connectionsRequests");
const userRouter = express.Router();

userRouter.get('/requests/received',userAuth,async (req,res)=>{
    try {
       const loggedInUser =  req.user ;
      const request = await ConnectionRequest.find({
        toUserId : loggedInUser._id ,
        status :"interested"
       }).populate(
        "fromUserId",
        "firstName lastName photoUrl age gender about skills"
       )
    // }).populate("fromUserId" ,["firstName lastName "])

    res.json({
        message : "Data fetched Successfully",
        data : request
    })
        
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})
module.exports = userRouter ;
// module.exports = {
//     userRouter 
// }