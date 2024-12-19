import IBattleRepository from "@/app/contracts/i-battle-repository";
import IUseCase from "@/app/contracts/i-use-case";
import BattleEvent from "@/entities/BattleEvent";
import UpdateUserAndMonsterByBattleEvent from "../update-user-monster-by-battle-event";
import IUserRepository from "@/app/contracts/i-user-repository";
import IMonsterRepository from "@/app/contracts/i-monster-repository";

class CreateBattleEvent implements IUseCase {
  async execute({
    battleId,
    battleRepository,
    userRepository,
    monsterRepository,
    event,
  }: {
    battleId: string;
    battleRepository: IBattleRepository;
    userRepository: IUserRepository;
    monsterRepository: IMonsterRepository;
    event: BattleEvent;
  }): Promise<BattleEvent> {
    const battle = await battleRepository.getById(battleId);

    if (!battle) {
      throw new Error("Battle not found");
    }

    await UpdateUserAndMonsterByBattleEvent.execute({
      userRepository,
      monsterRepository,
      event,
      user: battle.user,
      monster: battle.monster,
    });

    return await battleRepository.createEvent(battle, event);
  }
}

export default new CreateBattleEvent();
