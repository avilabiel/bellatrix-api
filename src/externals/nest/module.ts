import { Module } from "@nestjs/common";
import { UserController } from "./controllers/users";
import { BattleController } from "./controllers/battle";

@Module({
  imports: [],
  controllers: [UserController,BattleController],
  providers: [],
})
export default class AppModule {}
