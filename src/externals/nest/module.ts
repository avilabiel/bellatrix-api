import { Module } from "@nestjs/common";
import { UserController } from "./controllers/users";
import { BattleController } from "./controllers/battle";
import { MonsterController } from "./controllers/monster";

@Module({
  imports: [],
  controllers: [UserController, BattleController, MonsterController],
  providers: [],
})
export default class AppModule {}
