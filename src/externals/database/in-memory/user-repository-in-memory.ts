import { uuid } from "uuidv4";
import User from "@/entities/User";
import UserRepository from "@/app/contracts/i-user-repository";
import BattleEvent from "@/entities/BattleEvent";
import Monster from "@/entities/Monster";

export default class UserRepositoryInMemory implements UserRepository {
  private users: User[] = [];

  create({ user }: { user: User }): Promise<User> {
    user.id = uuid();
    user.createdAt = new Date();

    this.users.push(user);

    return Promise.resolve(new User(user));
  }

  getByNick(nick: string): Promise<User | null> {
    const user = this.users.find((user) => user.nick === nick);

    if (user) {
      return Promise.resolve(new User(user));
    }

    return Promise.resolve(null);
  }

  getById(userId: string): Promise<User> {
    const user = this.users.find((user) => user.id === userId);

    if (user) {
      return Promise.resolve(new User(user));
    }

    return Promise.resolve(null);
  }

  update({
    user,
    event,
    monster,
  }: {
    user: User;
    event: BattleEvent;
    monster: Monster;
  }): Promise<User> {
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

    return Promise.resolve(user);
  }
}
