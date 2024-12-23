import mongoose from "mongoose";
import IMonsterRepository from "@/app/contracts/i-monster-repository";
import Monster from "@/entities/Monster";
// import MonsterModel, { monsterSchema } from "./models/monster";

class MonsterRepositoryMongo implements IMonsterRepository {
  constructor() {}

  async list(): Promise<Monster[]> {
    console.log("MONGO URL", process.env.MONGO_URL);
    // await mongoose.connect(process.env.MONGO_URL);
    return [];

    // Convert to Monster entity
    // return monsterList.map((monster) => new Monster(monster));
  }
}

export default MonsterRepositoryMongo;
