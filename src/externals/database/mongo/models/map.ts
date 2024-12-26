import { Schema, model } from "mongoose";

const mapSchema = new Schema({ 
  name: { type: String, required: true },
  image: { type: String, required: true },
  monsters: [{ type: Schema.Types.ObjectId, ref: "Monster" }],
  createdAt: { type: Date },
});

const Map = model("Map", mapSchema);

export default Map;
