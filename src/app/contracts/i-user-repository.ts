import User from "@/entities/User";

export default interface UserRepository {
  create({ user }: { user: User }): Promise<User>;

  getByNick(nick: string): Promise<User | null>;
}
