import IUseCase from "@/app/contracts/i-use-case";
import UserRepository from "@/app/contracts/i-user-repository";
import User from "@/entities/User";

class CreateUser implements IUseCase {
  async execute({
    nick,
    userRepository,
  }: {
    nick: string;
    userRepository: UserRepository;
  }): Promise<User> {
    const user = await userRepository.getByNick(nick);

    if (user) {
      throw new Error("Nick is already used");
    }

    const userToCreate = this.buildUser(nick);

    return await userRepository.create({ user: userToCreate });
  }

  private buildUser(nick: string): User {
    const images = [
      "https://pbs.twimg.com/profile_images/1725495920840585217/rdF0kKid_400x400.jpg",
      "https://i1.sndcdn.com/artworks-cGZzsSI3LHT0NyfC-CV1j9Q-t500x500.jpg",
      "https://static.wikia.nocookie.net/tkoc/images/4/4b/Link_%28Ocarina_of_Time%29.png/revision/latest/scale-to-width-down/1200?cb=20140821114038&path-prefix=pt-br",
    ];

    return {
      nick,
      image: images[0],
      character: {
        level: 1,
        hp: 20,
        mp: 10,
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
