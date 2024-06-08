const { errorResponse } = require("../../helper/error.response")
const ludoGame = require("../../models/ludo.game")


exports.createGame =  async (req, res) =>{
    try{
       
        let isGameCreated = await ludoGame.findOne({
            $or:[{
                status: "new"
            }],
            user_id: req.params.id
        })

        // if(isGameCreated){
        //     return errorResponse(res, 400, false, "Game already created")
        // }else{
            let gameCreate = await ludoGame.create({
                user_id: req.params.id,
                game_amount: req.body.amount,
                status: "new"
            })
            if(!gameCreate){
                return errorResponse(res, 400, false, "Some thing went wrong game not created")
            }else{
                return errorResponse(res, 201, true, "Game create successfully", gameCreate)
            }
        // }

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}
exports.gameOpen =  async (req, res) =>{
    try{
       
        let isGame = await ludoGame.find({
            $or:[{
                status: "new"
            }],
        }).populate(["user_id"])

        if(!isGame){
            return errorResponse(res, 400, false, "Some thing went wrong game not fetch")
        }else{
            return errorResponse(res, 200, true, "Game fetch successfully", isGame)
        }
        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}
exports.gameDelete =  async (req, res) =>{
    try{
       
        let isGame = await ludoGame.findOneAndDelete({
           _id: req.params.id
        })

        if(!isGame){
            return errorResponse(res, 400, false, "Some thing went wrong game not fetch")
        }else{
            return errorResponse(res, 200, true, "Game delete successfully", isGame)
        }
        

    }catch(e){
        return errorResponse(res, 500, false, e.message)
    }
}