import IMapRepository from "@/app/contracts/i-map-repository";
import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import Battle from "@/entities/Battle";
import Monster from "@/entities/Monster";
import User from "@/entities/User";

class UserWalk implements IUseCase {
  async execute({
    userId,
    mapId,
    x,
    y,
    // mapRepository,
    userRepository,
  }: {
    userId: string;
    mapId: string;
    x: number;
    y: number;
    // mapRepository: IMapRepository;
    userRepository: IUserRepository;
  }): Promise<any> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // const gameMap = await mapRepository.getById(mapId);

    // if (!gameMap) {
    //   throw new Error("Map not found");
    // }

    const { shouldGoToBattle, selectedMonster } = this.shouldGoToBattle();

    if (!shouldGoToBattle) {
      return;
    }

    const battle = this.buildBattle(user);
    return battle;
  }

  // Todo: receive monsters from map
  private shouldGoToBattle(): {
    shouldGoToBattle: boolean;
    selectedMonster: string;
  } {
    const monsters = [
      { name: "rat", spawnChance: 0.3 },
      { name: "goblin", spawnChance: 0.2 },
    ];

    let rand = Math.random(); // returns from 0 to 1
    // rand = 0.5 - rat.spawnChance => 0.2
    // rand = 0.2 - globin.spawnChance => 0 => BATTLE
    let shouldGoToBattle = false;
    let selectedMonster = null;
    let count = 0;

    while (rand > 0) {
      if (!monsters[count]) {
        break;
      }

      rand -= monsters[count].spawnChance;

      if (rand <= 0) {
        shouldGoToBattle = true;
        selectedMonster = monsters[count].name;
        break;
      }

      count++;
    }

    return { shouldGoToBattle, selectedMonster };
  }

  private async buildBattle(user: User): Promise<Battle> {
    const rat = new Monster({
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
    });

    return new Battle({
      user,
      monster: rat,
      events: [],
      startedAt: new Date(),
    });
  }
}

export default new UserWalk();
