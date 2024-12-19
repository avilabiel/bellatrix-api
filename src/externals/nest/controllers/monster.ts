import Monster from "@/entities/Monster";
import { Controller, Get, Param } from "@nestjs/common";
import config from "@/config";
@Controller("monster")
export class MonsterController {
  @Get(":id")
  async get(@Param("id") id: string): Promise<Monster> {
    return await config.repositories.monsterRepository.getById(id);
  }
}
