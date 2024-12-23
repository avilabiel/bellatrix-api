import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import MonsterRepositoryInMemory from "./externals/database/in-memory/monster-repository-in-memory";
import MapRepositoryInMemory from "./externals/database/in-memory/map-repository-in-memory";
import BattleRepositoryInMemory from "./externals/database/in-memory/battle-repository-in-memory";
import MonsterRepositoryMongo from "./externals/database/mongo/monster-repository-mongo";

export default {
  repositories: {
    userRepository: new UserRepositoryInMemory(),
    monsterRepository: new MonsterRepositoryMongo(),
    mapRepository: new MapRepositoryInMemory(),
    battleRepository: new BattleRepositoryInMemory(),
  },
};
