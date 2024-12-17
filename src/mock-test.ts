import { ACTION_TYPE } from "./entities/BattleEvent";

export const user = {
  id: "17bd4331-6073-4b03-b79a-d7a2a307c3c8",
  nick: "xx",
  image:
    " https://pbs.twimg.com/profile_images/1725495920840585217/rdF0kKid_400x400.jpg",
  character: {
    level: 1,
    deaths: 0,
    hp: 10,
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
  createdAt: new Date("2024-12-13T13:55:46.829Z"),
};
export const monster = {
  id: "1234-token",
  name: "Goblin",
  image: "https://cdn.vectorstock.com/i/1000v/01/10/rat-vector-2370110.jpg",
  level: 5,
  hp: 60,
  mp: 0,
  maxHp: 60,
  maxMp: 0,
  xp: 40,
  atk: {
    min: 5,
    max: 7,
  },
  spawnChance: 0.2,
  createdAt: new Date("2024-12-13T13:55:46.418Z"),
};
export const eventUserIsSenderBaseAttack = {
  actionType: ACTION_TYPE["base-attack"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  result: {
    sender: {
      isWinner: true,
    },
    receiver: {
      hp: -3,
    },
  },
};
export const eventUserIsSenderSpellAttack = {
  actionType: ACTION_TYPE["spell-attack"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  spells: {
    name: user.character.spells[0].name,
  },
  result: {
    sender: {
      isWinner: false,
      mp: -10,
    },
    receiver: {
      hp: -7,
    },
  },
};
export const eventUserIsSenderItemUsePotionHp = {
  actionType: ACTION_TYPE["item-use"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  item: {
    name: user.character.items[0].name,
  },
  result: {
    sender: {
      hp: 10,
      mp: 0,
      newQuantity: 4,
      isWinner: false,
    },
    receiver: null,
  },
};
export const eventUserIsSenderItemUsePotionMp = {
  actionType: ACTION_TYPE["item-use"],
  sender: {
    name: user.nick,
    isUser: true,
  },
  receiver: {
    name: monster.name,
    isUser: false,
  },
  item: {
    name: user.character.items[1].name,
  },
  result: {
    sender: {
      hp: 0,
      mp: 5,
      newQuantity: 1,
      isWinner: false,
    },
    receiver: null,
  },
};
export const eventMonsterIsSenderBaseAttack = {
  actionType: ACTION_TYPE["base-attack"],
  sender: {
    name: monster.name,
    isUser: false,
  },
  receiver: {
    name: user.nick,
    isUser: true,
  },
  result: {
    sender: {
      isWinner: true,
    },
    receiver: {
      hp: -3,
    },
  },
};
