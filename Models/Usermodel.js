const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Users" }
);
UserSchema.virtual("id").get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
});
const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
