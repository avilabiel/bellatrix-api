import IBattleRepository from "@/app/contracts/i-battle-repository";
import IUseCase from "@/app/contracts/i-use-case";
import BattleEvent from "@/entities/BattleEvent";
import UpdateUserAndMonsterByBattleEvent from "../update-user-monster-by-battle-event";
import IUserRepository from "@/app/contracts/i-user-repository";

class CreateBattleEvent implements IUseCase {
  async execute({
    battleId,
    battleRepository,
    userRepository,
    event,
  }: {
    battleId: string;
    battleRepository: IBattleRepository;
    userRepository: IUserRepository;
    event: BattleEvent;
  }): Promise<BattleEvent> {
    const battle = await battleRepository.getById(battleId);

    if (!battle) {
      throw new Error("Battle not found");
    }

    await UpdateUserAndMonsterByBattleEvent.execute({
      userRepository,
      event,
      user: battle.user,
      monster: battle.monster,
    });

    return await battleRepository.createEvent(battle, event);
  }
}

export default new CreateBattleEvent();
