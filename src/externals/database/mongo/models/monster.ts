import { Schema, model } from "mongoose";

const monsterSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  level: { type: Number, required: true },
  hp: { type: Number, required: true },
  mp: { type: Number, required: true },
  maxHp: { type: Number, required: true },
  maxMp: { type: Number, required: true },
  xp: { type: Number, required: true },
  atk: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  spawnChance: { type: Number, required: true },
  createdAt: { type: Date },
});

const Monster = model("Monster", monsterSchema);

export default Monster;