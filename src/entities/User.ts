export default class User {
  id?: string;
  nick: string;
  image: string;
  character: {
    level: number;
    hp: number;
    mp: number;
    xp: number;
    atk: {
      min: number;
      max: number;
    };
    spells: {
      name: string;
      atk: {
        min: number;
        max: number;
      };
    }[];
    items: {
      name: string;
      result: {
        hp: number;
        mp: number;
      };
      quantity: number;
    }[];
  };
  createdAt?: Date;

  constructor(props: User) {
    this.id = props.id;
    this.nick = props.nick;
    this.image = props.image;
    this.character = props.character;
    this.createdAt = props.createdAt;
  }
}
