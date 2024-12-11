export enum ACTION_TYPE {
  "base-attack" = "base-attack",
  "item-use" = "item-use",
  "spell-attack" = "spell-attack",
  "conclusion" = "conclusion",
}

export default class BattleEvent {
  actionType: ACTION_TYPE;
  sender: {
    id: string;
    name: string;
    isUser: boolean;
  };
  receiver: null | {
    id: string;
    name: string;
    isUser: boolean;
  };
  item?: null | {
    name: string;
  };
  spell?: null | {
    name: string;
  };
  result: {
    sender: null | {
      hp?: number;
      mp?: number;
      xp?: number;
      isWinner?: boolean;
      newQuantity?: number;
    };
    receiver: null | {
      hp?: number;
      mp?: number;
      xp?: number;
      isWinner?: boolean;
      newQuantity?: number;
    };
  };

  constructor(props: BattleEvent) {
    this.actionType = props.actionType;
    this.sender = props.sender;
    this.receiver = props.receiver;
    this.item = props.item;
    this.spell = props.spell;
    this.result = props.result;
  }
}
