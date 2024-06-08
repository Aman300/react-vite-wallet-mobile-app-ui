const { errorResponse } = require("../../helper/error.response")
const ludoGame = require("../../models/ludo.game")
const ludoUser = require("../../models/ludo.user")
const { sendEmail } = require("../../utils/OtpEmail")


exports.userLogin  =  async (req, res) =>{

    try{

        if(req.body.email && req.body.otp && req.body.token){
            let isUserExist = await ludoUser.findOne({
                email: req.body.email,
                otp: req.body.otp,
                token: req.body.token
            })
            if (isUserExist) {        
                return errorResponse(res, 200, true, "Login successfully!", isUserExist);
            }
        }else{

            let otp = 123456

            let newUserCreated = await ludoUser.create({
                // name: "AfHkldKH",
                // profile:"https://avatar.iran.liara.run/public/19",
                email: req.body.email,
                otp: otp,
                token:"UKJHLhlkdsklfuiHLHIOyioholskhdfkl8979023lkndfoa7us%*%&*6oslk3uj42j34jklh"
            })
            if(!newUserCreated){
                return errorResponse(res, 400, false, "Something went wrong!!!")
            }else{
                await sendEmail(newUserCreated.email, "OTP Verify Email", otp);
                return errorResponse(res, 201, true, "Please verify OTP to continew!!", newUserCreated)
            }
        }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

}
exports.clearDatabase  =  async (req, res) =>{

    try{
        let isUserDbClear = await ludoUser.deleteMany({})
        let isLudoGameDbClear = await ludoGame.deleteMany({})
        if (isUserDbClear && isLudoGameDbClear) {        
            return errorResponse(res, 200, true, "Database Clear successfully!");
        }else{
            return errorResponse(res, 201, true, "Database clear successfully ✔✌🎉")
        }
        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }

}