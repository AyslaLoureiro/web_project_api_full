const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validator: {
      function(v) {
        return validator.isURL(v);
      },
      message: "Link invalido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("card", cardSchema);
