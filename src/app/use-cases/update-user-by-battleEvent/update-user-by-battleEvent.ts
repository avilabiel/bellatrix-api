import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import BattleEvent from "@/entities/BattleEvent";
import Monster from "@/entities/Monster";
import User from "@/entities/User";

class UpdateUserByBattleEvent implements IUseCase {
  async execute({
    userRepository,
    user,
    event,
    monster,
  }: {
    userRepository: IUserRepository;
    user: User;
    event: BattleEvent;
    monster: Monster;
  }): Promise<User> {
    const userUpdated = this.updateUserStats(user, event, monster);
    return await userRepository.update(userUpdated);
  }

  private updateUserStats(user: User, event: BattleEvent, monster: Monster) {
    if (event.actionType === "item-use") {
      const nameItemFromEvent = event.item.name;
      const newQuantityOfItem = event.result.sender.newQuantity;

      user.character.items.find(
        (item) => item.name === nameItemFromEvent
      ).quantity = newQuantityOfItem;
    }

    user.character.hp += event.result.sender.hp || 0;
    user.character.mp += event.result.sender.mp || 0;

    if (event.result.sender.isWinner) {
      user.character.xp += monster.xp;
    }
    
    if (event.result.receiver.isWinner) {
      user.character.level = 1;
      user.character.deaths += 1;
    }

    return user;
  }
}

export default new UpdateUserByBattleEvent();
