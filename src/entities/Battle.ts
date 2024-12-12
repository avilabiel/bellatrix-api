import BattleEvent from "./BattleEvent";
import Monster from "./Monster";
import User from "./User";

export default class Battle {
  id?: string;
  user: User;
  monster: Monster;
  events: BattleEvent[];
  startedAt: Date;
  finishedAt?: Date;

  constructor(props: Battle) {
    this.id = props.id;
    this.user = props.user;
    this.monster = props.monster;
    this.events = props.events;
    this.startedAt = props.startedAt;
    this.finishedAt = props.finishedAt;
  }
}
