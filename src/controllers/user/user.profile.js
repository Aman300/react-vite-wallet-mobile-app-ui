const { errorResponse } = require("../../helper/error.response")
const { tokenVerifyUserId } = require("../../helper/token.user")


exports.updateProfile = async (req,res) =>{
    try{
     let userId = tokenVerifyUserId((req.headers.authorization && req.headers.authorization.split(" ")[1]))

     let isProfileUpdate = await 
        

    }catch(e){
        return errorResponse(req, 500, e.message)
    }
}