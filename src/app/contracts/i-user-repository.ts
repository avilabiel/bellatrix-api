import BattleEvent from "@/entities/BattleEvent";
import Monster from "@/entities/Monster";
import User from "@/entities/User";

export default interface IUserRepository {
  create({ user }: { user: User }): Promise<User>;

  getByNick(nick: string): Promise<User | null>;

  getById(userId: string): Promise<User | null>;

  update({
    user,
    event,
    monster,
  }: {
    user: User;
    event: BattleEvent;
    monster: Monster;
  }): Promise<User>;
}
