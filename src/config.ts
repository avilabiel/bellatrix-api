import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import MonsterRepositoryInMemory from "./externals/database/in-memory/monster-repository-in-memory";
import MapRepositoryInMemory from "./externals/database/in-memory/map-repository-in-memory";
// import ...

export default {
  repositories: {
    userRepository: new UserRepositoryInMemory(),
    monsterRepository: new MonsterRepositoryInMemory(),
    mapRepository: new MapRepositoryInMemory(), 
  },
};
