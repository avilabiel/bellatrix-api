import IMapRepository from "@/app/contracts/i-map-repository";
import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import IMonsterRepository from "@/app/contracts/i-monster-repository";
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
    monsterRepository,
    userRepository,
  }: {
    userId: string;
    mapId: string;
    x: number;
    y: number;
    // mapRepository: IMapRepository;
    monsterRepository: IMonsterRepository;
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

    const selectedMonster = await this.shouldGoToBattle(monsterRepository);

    if (!selectedMonster) {
      return;
    }

    const battle = this.buildBattle(user, selectedMonster);
    return battle;
  }

  // Todo: receive monsters from map
  private async shouldGoToBattle(
    monsterRepository: IMonsterRepository
  ): Promise<Monster | null> {
    const monsters = await monsterRepository.list();
    let rand = Math.random(); // returns from 0 to 1
    // rand = 0.5 - rat.spawnChance => 0.2
    // rand = 0.2 - globin.spawnChance => 0 => BATTLE
    let selectedMonster = null;
    let count = 0;

    while (rand > 0) {
      if (!monsters[count]) {
        break;
      }

      rand -= monsters[count].spawnChance;

      if (rand <= 0) {
        selectedMonster = monsters[count];
        break;
      }

      count++;
    }

    return selectedMonster;
  }

  private async buildBattle(user: User, monster: Monster): Promise<Battle> {
    return new Battle({
      user,
      monster,
      events: [],
      startedAt: new Date(),
    });
  }
}

export default new UserWalk();
