const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


const schema = new mongoose.Schema(
  {
    user_id: {
        type: ObjectId,
        ref: "ludo.user",
    },
    game_amount:{
        type: Number,
        required: true
    },
    winner_id:{
        type: ObjectId,
        ref: "ludo.user",
        default: null
    },
    luser_id:{
        type: ObjectId,
        ref: "ludo.user",
        default: null
    }, 
    status:{
        type: String,
        enum:["new","pending", "running","canceled","rejected","drop"],
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// Create User model
const ludoGame = mongoose.model("ludo.game", schema);

module.exports = ludoGame;