import Monster from "./Monster";

export default class Map {
  id?: string;
  name: string;
  image: string;
  monsters: Monster[];
  createdAt?: Date;

  constructor(props: Map) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.monsters = props.monsters;
    this.createdAt = props.createdAt;
  }
}
