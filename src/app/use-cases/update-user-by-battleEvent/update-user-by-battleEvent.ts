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
      const newQuantityOfItem =
        event.result.sender.newQuantity || event.sender.name === user.nick
          ? event.result.sender.newQuantity
          : event.result.receiver.newQuantity ||
            event.receiver.name === user.nick
          ? event.result.receiver.newQuantity
          : 0;

      user.character.items.find(
        (item) => item.name === nameItemFromEvent
      ).quantity += newQuantityOfItem;
    }

    if (event.sender.name === user.nick && event.receiver.name === user.nick) {
      user.character.hp +=
        event.result.sender.hp || event.sender.name === user.nick
          ? event.result.sender.hp
          : event.result.receiver.hp || event.receiver.name === user.nick
          ? event.result.receiver.hp
          : 0;
      user.character.mp +=
        event.result.sender.mp || event.sender.name === user.nick
          ? event.result.sender.mp
          : event.result.receiver.mp || event.receiver.name === user.nick
          ? event.result.receiver.mp
          : 0;
    }

    if (
      (event.result.sender.isWinner || event.sender.name === monster.name) &&
      (event.result.receiver.isWinner || event.receiver.name === monster.name)
    ) {
      user.character.level = 1;
      user.character.deaths += 1;
      user.character.xp = 0;
    }
    if (
      (event.result.sender.isWinner || event.sender.name === user.nick) &&
      (event.result.receiver.isWinner || event.receiver.name === user.nick)
    ) {
      user.character.xp += monster.xp;
    }

    return user;
  }
}

export default new UpdateUserByBattleEvent();
