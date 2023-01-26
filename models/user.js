const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    googleId:{
      type:String
    },
    
    email: {
      type: String,
      required: [true, "email field is required"],
      trim: true,
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Email is invalid");
      //   }
      // },
    },
    password: {
      type: String,
     required: [true, "password field is required"],
      minLength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("pass")) {
          throw new Error("Passwords cannot contain 'pass'");
        }
      },
    },

    image:{
type:String,
required:[true,"image profile required"],
    },

   verified:{type:Boolean,
   required:true}, 
   form:{
    type :String,
    enum:['Personal','work','Education'],
   }
  },
  {
    capped: {
      size: 1024 * 1024 * 1024, // 1GB Maximum size
      autoIndexId: true,
    },
    collection: "user-info",
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
