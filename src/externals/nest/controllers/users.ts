import CreateUser from "@/app/use-cases/create-user";
import UserWalk from "@/app/use-cases/user-walk";
import config from "@/config";
import Battle from "@/entities/Battle";
import User from "@/entities/User";
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Res,
} from "@nestjs/common";
import { Response } from "express";

type CreateUserBody = {
  nick: string;
};

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() payload: CreateUserBody): Promise<User> {
    try {
      return await CreateUser.execute({
        nick: payload.nick,
        userRepository: config.repositories.userRepository,
      });
    } catch (error) {
      if (error.message.includes("Nick")) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(":id/walk")
  async userWalk(
    @Param("id") userId,
    @Body("mapId") mapId,
    @Res() res: Response
  ): Promise<Response<Battle>> {
    try {
      const battleOrNothing: Battle = await UserWalk.execute({
        userId,
        mapId,
        x: 1,
        y: 1,
        mapRepository: config.repositories.mapRepository,
        userRepository: config.repositories.userRepository,
        battleRepository: config.repositories.battleRepository,
      });
      return res.status(HttpStatus.OK).json(battleOrNothing);
    } catch (error) {
      if (error.message.includes("User not found")) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async get(@Param("id") userId): Promise<User> {
    return await config.repositories.userRepository.getById(userId);
  }
}
