export default class Monster {
  id?: string;
  name: string;
  image: string;
  level: number;
  hp: number;
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
    this.xp = props.xp;
    this.atk = props.atk;
    this.spawnChance = props.spawnChance;
    this.createdAt = props.createdAt;
  }
}
