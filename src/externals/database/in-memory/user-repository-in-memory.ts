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

  update({ user }: { user: User }): Promise<User> {
    return Promise.resolve(user);
  }
}
