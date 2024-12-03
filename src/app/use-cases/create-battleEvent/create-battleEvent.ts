import IBattleRepository from "@/app/contracts/i-battle-repository";
import IUseCase from "@/app/contracts/i-use-case";
import Battle from "@/entities/Battle";
import BattleEvent, { ACTION_TYPE } from "@/entities/BattleEvent";

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
    const battle = battleRepository.getById(battleId);

    if (!battle) {
      throw new Error("Battle not found");
    }
    const battleEventToCreate = this.buildBattleEvent(event);
    return await battleRepository.createEvent(battleEventToCreate);
  }
  
  private buildBattleEvent(event: BattleEvent): BattleEvent {
    return event;
  }
}

export default new CreateBattleEvent();
