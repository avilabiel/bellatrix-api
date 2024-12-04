import { v4 as uuid } from "uuid";
import IBattleRepository from "@/app/contracts/i-battle-repository";
import Battle from "@/entities/Battle";
import BattleEvent from "@/entities/BattleEvent";

export default class BattleRepositoryInMemory implements IBattleRepository {

  private battle: Battle[] = [];

  create(battle: Battle): Promise<Battle> {
    battle.id = uuid();
    battle.startedAt = new Date();
    this.battle.push(battle);
    return Promise.resolve(new Battle(battle));
  }

  createEvent(battle: Battle, event: BattleEvent): Promise<BattleEvent> {
    battle.events.push(event);
    return Promise.resolve(new BattleEvent(event));
  }

  getById(battleId: string): Promise<Battle> {
    const battle = this.battle.find((battle) => battle.id === battleId);
    
    if (battle) {
      return Promise.resolve(new Battle(battle));
    }

    return Promise.resolve(null);
  }
}
