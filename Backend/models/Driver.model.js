import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GeoSchema } from "./Ride.model.js";

const Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username field cannot be empty"],
    lowercase: true,
  },
  firstName: {
    type: String,

    required: [true, "firstName field cannot be empty"],
    lowercase: true,
  },
  middleName: {
    type: String,

    lowercase: true,
  },
  lastName: {
    type: String,

    required: [true, "lastName field cannot be empty"],
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: [true, "mobileNumber field cannot be empty"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email field cannot be empty"],
  },
  ambulanceNumber: {
    type: String,
    unique: true,
    required: [true, "ambulance number field cannot be empty"],
  },
  ambulanceType: {
    type: String,
    lowercase:true,
    required: [true, "ambulance type field cannot be empty"],
  },
  organizationAffiliated: {
    type: String,

    required: [true, "organization field cannot be empty"],
  },
  password: {
    type: String,

    required: [true, "password field cannot be empty"],
  },
  location: {
   type:GeoSchema,
   index: '2dsphere'
  },
  refreshToken: {
    type: String,
  },
});
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
Schema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
Schema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      mobileNumber: this.mobileNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

Schema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


const driver = mongoose.model("driver", Schema);


export { driver };
