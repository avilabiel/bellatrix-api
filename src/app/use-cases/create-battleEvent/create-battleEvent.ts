import IBattleRepository from "@/app/contracts/i-battle-repository";
import IUseCase from "@/app/contracts/i-use-case";
import BattleEvent from "@/entities/BattleEvent";
import updateUserByBattleEvent from "../update-user-by-battleEvent";
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
    
    const user = battle.user;
    const monster = battle.monster;

    await updateUserByBattleEvent.execute({
      userRepository,
      user,
      event,
      monster,
    });

    if (event.result.sender.isWinner) {
      return event;
    }

    return await battleRepository.createEvent(battle, event);
  }
}

export default new CreateBattleEvent();
