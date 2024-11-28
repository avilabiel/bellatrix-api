import { v4 as uuid } from "uuid";
import Monster from "@/entities/Monster";
import MonsterRepository from "@/app/contracts/i-monster-repository";

export default class MonsterRepositoryInMemory implements MonsterRepository {
  private monsters: Monster[] = [
    {
      id: "1234-token",
      name: "Rat",
      image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
      level: 1,
      hp: 20,
      mp: 0,
      maxHp: 20,
      maxMp: 0,
      xp: 10,
      atk: {
        min: 1,
        max: 3,
      },
      spawnChance: 0.5,
      createdAt: new Date(),
    },
    {
      id: "1234-token",
      name: "Goblin",
      image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
      level: 5,
      hp: 60,
      mp: 0,
      maxHp: 60,
      maxMp: 0,
      xp: 40,
      atk: {
        min: 5,
        max: 7,
      },
      spawnChance: 0.2,
      createdAt: new Date(),
    },
  ];

  list(): Promise<Monster[]> {
    return Promise.resolve(this.monsters);
  }
}
