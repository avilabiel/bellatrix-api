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
    return await userRepository.update({ user, event, monster });
  }
}

export default new UpdateUserByBattleEvent();
