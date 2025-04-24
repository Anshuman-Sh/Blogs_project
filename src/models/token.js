const mongoose = require("mongoose");
const { USER_TYPE, TOKEN_TYPE } = require("../config/appConstants");

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "admins" },
    role: { type: String, enum: [...Object.values(USER_TYPE)], required: true },
    type: {
      type: String,
      enum: [...Object.values(TOKEN_TYPE)],
      required: true,
    },
    expires: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
