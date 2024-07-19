import IMapRepository from "@/app/contracts/i-map-repository";
import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";

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
    // const user = await userRepository.getById(userId);

    // if (!user) {
    //   throw new Error("User not found");
    // }

    // const gameMap = await mapRepository.getById(mapId);

    // if (!gameMap) {
    //   throw new Error("Map not found");
    // }

    // calcs chance to get a battle
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
        selectedMonster = monsters[count];
        break;
      }

      count++;
    }

    return { battle: shouldGoToBattle, selectedMonster };
  }
}

export default new UserWalk();
