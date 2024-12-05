import User from "@/entities/User";

export default interface IUserRepository {
  create({ user }: { user: User }): Promise<User>;

  getByNick(nick: string): Promise<User | null>;

  getById(userId: string): Promise<User | null>;

  update({ user }: { user: User }): Promise<User>;
}
