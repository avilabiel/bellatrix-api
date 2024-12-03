import Battle from "@/entities/Battle";
import BattleEvent from "@/entities/BattleEvent";

export default interface IBattleRepository {
  create(battle: Battle): Promise<Battle>;

  createEvent(battle: Battle, event: BattleEvent): Promise<BattleEvent>;

  getById(battleId: string): Promise<Battle>;
}
