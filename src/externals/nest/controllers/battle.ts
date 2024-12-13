import createBattleEvent from "@/app/use-cases/create-battle-event/create-battle-event";
import config from "@/config";
import BattleEvent from "@/entities/BattleEvent";
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";

@Controller("battle")
export class BattleController {
  @Post(":id/event")
  async create(
    @Param() payload: { id: string },
    @Body() event: BattleEvent
  ): Promise<BattleEvent> {
    try {
      return await createBattleEvent.execute({
        battleId: payload.id,
        battleRepository: config.repositories.battleRepository,
        userRepository: config.repositories.userRepository,
        event,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
