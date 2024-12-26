import { Schema, model } from "mongoose";

const spellSchema = new Schema({
  name: { type: String, required: true },
  atk: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  mpCost: { type: Number, required: true },
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  result: {
    hp: { type: Number, required: true },
    mp: { type: Number, required: true },
  },
  quantity: { type: Number, required: true },
});

const characterSchema = new Schema({
  level: { type: Number, required: true },
  deaths: { type: Number, required: true },
  hp: { type: Number, required: true },
  mp: { type: Number, required: true },
  maxHp: { type: Number, required: true },
  maxMp: { type: Number, required: true },
  xp: { type: Number, required: true },
  atk: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  spells: [spellSchema],
  items: [itemSchema],
});

const userSchema = new Schema({
  nick: { type: String, required: true },
  image: { type: String, required: true },
  character: { type: characterSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);

export default User;
