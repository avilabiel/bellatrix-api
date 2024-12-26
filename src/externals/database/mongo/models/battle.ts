import { Schema, model } from "mongoose";

const battleEventSchema = new Schema({
  actionType: {
    type: String,
    enum: ["base-attack", "item-use", "spell-attack", "conclusion"],
  },
  sender: {
    name: { type: String },
    isUser: { type: Boolean },
  },
  receiver: {
    type: {
      name: { type: String },
      isUser: { type: Boolean },
    },
    default: null,
  },
  item: {
    type: {
      name: { type: String },
    },
    default: null,
  },
  spell: {
    type: {
      name: { type: String },
    },
    default: null,
  },
  result: {
    sender: {
      hp: { type: Number },
      mp: { type: Number },
      xp: { type: Number },
      isWinner: { type: Boolean },
      newQuantity: { type: Number },
    },
    receiver: {
      hp: { type: Number },
      mp: { type: Number },
      xp: { type: Number },
      isWinner: { type: Boolean },
      newQuantity: { type: Number },
    },
  },
});

const battleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  monster: { type: Schema.Types.ObjectId, ref: "Monster" },
  events: [battleEventSchema],
  startedAt: { type: Date },
  finishedAt: { type: Date, default: null },
});

const Battle = model("Battle", battleSchema);

export default Battle;
