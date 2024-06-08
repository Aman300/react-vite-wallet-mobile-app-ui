const ludoUser = require("../models/ludo.user");
const { errorResponse } = require("./error.response");
const jwt = require("jsonwebtoken");

exports.tokenVerifyUserId = async (res, token) =>{
    try{
        if (!token) {
            return errorResponse(res, 401, false, "Access denied. No token provided.")
        }
        let { userId } = jwt.verify(token, "jwt_key_!@#$");

        let isUserExist = await ludoUser.findOne({_id: userId})

        if(!isUserExist){
            return errorResponse(res, 404, false, "User not exist in out system")
        }else{
            return userId
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

};
