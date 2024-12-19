import CreateBattleEvent from "./create-battle-event";
import { ACTION_TYPE } from "@/entities/BattleEvent";
import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
import BattleRepositoryInMemory from "@/externals/database/in-memory/battle-repository-in-memory";
import MapRepositoryInMemory from "@/externals/database/in-memory/map-repository-in-memory";
import UserWalk from "../user-walk/user-walk";
import CreateUser from "../create-user/create-user";
import MonsterRepositoryInMemory from "@/externals/database/in-memory/monster-repository-in-memory";

const userRepository = new UserRepositoryInMemory();
const battleRepository = new BattleRepositoryInMemory();
const monsterRepository = new MonsterRepositoryInMemory();
const mapRepository = new MapRepositoryInMemory();
const event = {
  actionType: ACTION_TYPE["base-attack"],
  sender: {
    name: "r20",
    isUser: true,
  },
  receiver: {
    name: "Globlin",
    isUser: false,
  },
  result: {
    sender: {
      isWinner: false,
    },
    receiver: {
      hp: -3,
    },
  },
};

describe("CreateBattleEvent/execute", () => {
  it("should return the created battle event", async () => {
    const { id: userId } = await CreateUser["execute"]({
      nick: "r20",
      userRepository,
    });

    const { id: battleId } = await UserWalk["execute"]({
      userId,
      mapId: "1",
      mapRepository,
      userRepository,
      battleRepository,
      x: 0,
      y: 0,
    });

    const eventResult = await CreateBattleEvent.execute({
      battleId,
      battleRepository,
      userRepository,
      monsterRepository,
      event,
    });

    expect(eventResult).toMatchObject(event);
  });

  it("should throw error if battle not found", async () => {
    const battleEvent = CreateBattleEvent.execute({
      battleId: "1234",
      battleRepository,
      userRepository,
      monsterRepository,
      event,
    });

    expect(battleEvent).rejects.toThrowError("Battle not found");
  });
});
