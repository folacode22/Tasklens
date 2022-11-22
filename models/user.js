const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: { type: String, required: [true, "name field is required"] },
    email: {
      type: String,
      required: [true, "email field is required"],
      // trim: true,
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
    verified:{type:Boolean,
   required:true},
   
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
