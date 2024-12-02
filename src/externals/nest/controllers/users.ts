import CreateUser from "@/app/use-cases/create-user";
import UserWalk from "@/app/use-cases/user-walk";
import config from "@/config";
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

  @Post(":userId/:mapId/walk")
  async userWalk(
    @Param("userId") userId,
    @Param("mapId") mapId,
    @Res() res: Response
  ): Promise<any> {
    try {
      const battleOrNothing = await UserWalk.execute({
        userId,
        mapId,
        x: 1,
        y: 1,
        mapRepository: config.repositories.mapRepository,
        userRepository: config.repositories.userRepository,
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

  @Get()
  async get(): Promise<any> {
    return { test: true };
  }
}
