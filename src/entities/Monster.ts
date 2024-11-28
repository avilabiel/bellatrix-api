export default class Monster {
  id?: string;
  name: string;
  image: string;
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
  spawnChance: number;
  createdAt?: Date;

  constructor(props: Monster) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.level = props.level;
    this.hp = props.hp;
    this.mp = props.mp;
    this.maxHp = props.maxHp;
    this.maxMp = props.maxMp;
    this.xp = props.xp;
    this.atk = props.atk;
    this.spawnChance = props.spawnChance;
    this.createdAt = props.createdAt;
  }
}
