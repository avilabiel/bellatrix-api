type Character = {
  level: number;
  hp: number;
  mp: number;
  maxHp: number;
  maxMp: number;
  xp: number;
  atk: {
    min: number;
    max: number;
  };
  spells: Spell[];
  items: Item[];
};

type Spell = {
  name: string;
  atk: {
    min: number;
    max: number;
  };
  mpCost: number;
};

type Item = {
  name: string;
  result: {
    hp: number;
    mp: number;
  };
  quantity: number;
};

export default class User {
  id?: string;
  nick: string;
  image: string;
  character: Character;
  createdAt?: Date;

  constructor(props: {
    id?: string;
    nick: string;
    image: string;
    character: Character;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.nick = props.nick;
    this.image = props.image;
    this.character = props.character;
    this.createdAt = props.createdAt;
  }
}
