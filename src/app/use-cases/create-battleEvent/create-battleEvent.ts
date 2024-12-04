import IBattleRepository from "@/app/contracts/i-battle-repository";
import IUseCase from "@/app/contracts/i-use-case";
import BattleEvent from "@/entities/BattleEvent";

class CreateBattleEvent implements IUseCase {
  async execute({
    battleId,
    battleRepository,
    event,
  }: {
    battleId: string;
    battleRepository: IBattleRepository;
    event: BattleEvent;
  }): Promise<BattleEvent> {
    const battle = await battleRepository.getById(battleId);

    if (!battle) {
      throw new Error("Battle not found");
    }

    return await battleRepository.createEvent(battle, event);
  }
}

export default new CreateBattleEvent();
