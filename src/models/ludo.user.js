const mongoose = require("mongoose");

// Define User Schema
const schema = new mongoose.Schema(
  {
    email:{
        type: String,
        required: true,
        trim: true
    },
    otp:{
        type: Number,
        required: true,
        trim: true,
    },
    is_user_verified:{
        type: Boolean,
        default: false,
    },
    profile:{
        type: String,
        default: null,
        trim: true,
    },
    name:{
        type: String,
        trim: true,
    },
    wallet_balance:{
        type: Number,
        trim: true,
        default: 0,
    },
    total_withdrawal_amt:{
        type: Number,
        trim: true,
        default: 0,
    },
    total_deposit_amt:{
        type: Number,
        trim: true,
        default: 0,
    },
    total_bonus_amt:{
        type: Number,
        trim: true,
        default: 0,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    token: {
        type: String,
        default: ""
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate random name or profile if not provided
schema.pre('save', function(next) {
  if (!this.name) {
    this.name = generateRandomName();
  }
  if (!this.profile) {
    this.profile = generateRandomProfile();
  }
  next();
});

// Generate random name with exactly 6 characters
function generateRandomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomName = '';
  
    for (let i = 0; i < 6; i++) {
      randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return randomName;
  }
  
  

// Generate random profile with a random number between 1 to 99 at the end
function generateRandomProfile() {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    return `https://avatar.iran.liara.run/public/${randomNumber}`;
  }
  
// Create User model
const ludoUser = mongoose.model("ludo.user", schema);

module.exports = ludoUser;
