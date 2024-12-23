import mongoose from "mongoose";
import IMonsterRepository from "@/app/contracts/i-monster-repository";
import Monster from "@/entities/Monster";

class MonsterRepositoryMongo implements IMonsterRepository {
  private connection: mongoose.Connection;

  constructor() {
    this.connection = mongoose.createConnection(process.env.MONGO_URL);
  }

  list(): Promise<Monster[]> {
    return Promise.resolve([]);
  }
}

export default MonsterRepositoryMongo;
