import IMonsterRepository from "@/app/contracts/i-monster-repository";
import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import BattleEvent, { ACTION_TYPE } from "@/entities/BattleEvent";
import Monster from "@/entities/Monster";
import User from "@/entities/User";

class UpdateUserAndMonsterByBattleEvent implements IUseCase {
  async execute({
    userRepository,
    monsterRepository,
    event,
    monster,
    user,
  }: {
    userRepository: IUserRepository;
    monsterRepository: IMonsterRepository;
    event: BattleEvent;
    monster: Monster;
    user: User;
  }): Promise<{ user: User; monster: Monster }> {
    const updatedEntities = await this.updateUserAndMonsterStats({
      event,
      user,
      monster,
    });

    const userDbUpdate = await userRepository.update(updatedEntities.user);

    return { user: userDbUpdate, monster: updatedEntities.monster };
  }

  // Monstro sendo atualizad
  // Level UP
  // Max HP, Max MP, Next level XP, Atk, Def, Spd, Mag, Spr => UP
  private async updateUserAndMonsterStats({
    event,
    user,
    monster,
  }: {
    event: BattleEvent;
    user: User;
    monster: Monster;
  }): Promise<{ user: User; monster: Monster }> {
    const receiver: Monster | User["character"] = event.receiver.isUser
      ? user.character
      : monster;
    const sender: Monster | User["character"] = event.sender.isUser
      ? user.character
      : monster;

    if (event.actionType === ACTION_TYPE["base-attack"]) {
      receiver.hp += event.result.receiver.hp;
    }

    if (event.actionType === ACTION_TYPE["item-use"]) {
      sender.hp = Math.min(
        sender.hp + event.result.sender.hp,
        user.character.maxHp
      );
      sender.mp += event.result.sender.mp ?? 0;

      (sender as User["character"]).items.find(
        (item) => item.name === event.item.name
      ).quantity = event.result.sender.newQuantity;
    }

    if (event.actionType === ACTION_TYPE["spell-attack"]) {
      sender.mp += event.result.sender.mp;
      receiver.hp += event.result.receiver.hp;
    }

    const didUserWin = event.result.sender.isWinner && event.sender.isUser;
    const didMonsterWin = event.result.sender.isWinner && !event.sender.isUser;

    if (didUserWin) {
      user.character.xp += monster.xp;
    }

    if (didMonsterWin) {
      user.character.deaths += 1;
      user.character.level = 1;
      user.character.xp = 0;

      // TODO: use the public buildUserLevel1()
    }

    return { user, monster };
  }
}

export default new UpdateUserAndMonsterByBattleEvent();
