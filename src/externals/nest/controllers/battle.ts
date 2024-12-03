import createBattleEvent from "@/app/use-cases/create-battleEvent/create-battleEvent";
import config from "@/config";
import BattleEvent from "@/entities/BattleEvent";
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
@Controller("battle")
export class BattleController {
  @Post(":id")
  async create(
    @Body() id: string,
    @Body() event: BattleEvent
  ): Promise<BattleEvent> {
    try {
      return await createBattleEvent.execute({
        battleId: id,
        battleRepository: config.repositories.battleRepository,
        event,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
