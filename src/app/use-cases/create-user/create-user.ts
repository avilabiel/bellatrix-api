import IUseCase from "@/app/contracts/i-use-case";
import IUserRepository from "@/app/contracts/i-user-repository";
import User from "@/entities/User";

class CreateUser implements IUseCase {
  async execute({
    nick,
    userRepository,
  }: {
    nick: string;
    userRepository: IUserRepository;
  }): Promise<User> {
    const user = await userRepository.getByNick(nick);

    if (user) {
      throw new Error("Nick is already used");
    }

    const userToCreate = this.buildUserLevel1(nick);

    return await userRepository.create({ user: userToCreate });
  }

  // TODO: Make this public and use it across the system
  private buildUserLevel1(nick: string): User {
    const images = [
      "https://pbs.twimg.com/profile_images/1725495920840585217/rdF0kKid_400x400.jpg",
      "https://i1.sndcdn.com/artworks-cGZzsSI3LHT0NyfC-CV1j9Q-t500x500.jpg",
      "https://static.wikia.nocookie.net/tkoc/images/4/4b/Link_%28Ocarina_of_Time%29.png/revision/latest/scale-to-width-down/1200?cb=20140821114038&path-prefix=pt-br",
    ];

    return {
      nick: nick,
      image: images[Math.floor(Math.random() * images.length)],
      character: {
        level: 1,
        deaths: 0,
        hp: 20,
        mp: 10,
        maxHp: 20,
        maxMp: 10,
        xp: 0,
        atk: {
          min: 3,
          max: 5,
        },
        spells: [
          {
            name: "Bola de fogo",
            atk: {
              min: 7,
              max: 7,
            },
            mpCost: 10,
          },
        ],
        items: [
          {
            name: "Poção de HP",
            result: {
              hp: 10,
              mp: 0,
            },
            quantity: 5,
          },
          {
            name: "Poção de MP",
            result: {
              hp: 0,
              mp: 10,
            },
            quantity: 2,
          },
        ],
      },
    };
  }
}

export default new CreateUser();
