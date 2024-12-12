import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import BattleEvent from "@/entities/BattleEvent";
import Monster from "@/entities/Monster";
import User from "@/entities/User";

class UpdateUserByBattleEvent implements IUseCase {
  async execute({
    userRepository,
    event,
    monster,
    userId,
  }: {
    userRepository: IUserRepository;
    event: BattleEvent;
    monster: Monster;
    userId: string;
  }): Promise<User> {
    const userUpdated = await this.updateUserStats(
      userRepository,
      event,
      monster,
      userId
    );
    return await userRepository.update(userUpdated);
  }

  private async updateUserStats(
    userRepository: IUserRepository,
    event: BattleEvent,
    monster: Monster,
    userId: string
  ) {
    const userIsSender = event.sender.isUser ? true : false;
    const userIsReceiver = !userIsSender;

    const user = await userRepository.getById(userId);

    const initialUserHp = user.character.hp;
    const initialUserMp = user.character.mp;

    const monsterIsSender = !userIsSender;
    const monsterIsReceiver = !userIsReceiver;

    const winnerIsUser =
      (event.result.sender.isWinner && userIsSender) ||
      (event.result.receiver.isWinner && userIsReceiver);
    const winnerIsMonster =
      (event.result.sender.isWinner && monsterIsSender) ||
      (event.result.receiver.isWinner && monsterIsReceiver);

    if (event.actionType === "item-use") {
      const nameItemFromEvent = event.item.name;

      const newQuantityOfUserItem = userIsSender
        ? event.result.sender.newQuantity
        : event.result.receiver.newQuantity;

      user.character.items.find(
        (item) => item.name === nameItemFromEvent
      ).quantity = newQuantityOfUserItem;
    }

    if (userIsSender || userIsReceiver) {
      user.character.hp += userIsSender
        ? event.result.sender.hp
        : event.result.receiver.hp;

      user.character.mp += userIsSender
        ? event.result.sender.mp
        : event.result.receiver.mp;
    }

    if (winnerIsMonster) {
      user.character.hp = initialUserHp;
      user.character.mp = initialUserMp;
      user.character.deaths += 1;
      user.character.xp = 0;
    }
    if (winnerIsUser) {
      user.character.xp += monster.xp;
    }
    return user;
  }
}

export default new UpdateUserByBattleEvent();
