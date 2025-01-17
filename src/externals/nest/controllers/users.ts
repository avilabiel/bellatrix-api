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
} from "@nestjs/common";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() nick: string): Promise<User> {
    try {
      return await CreateUser.execute({
        nick,
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
  async userWalk(@Param("id") userId): Promise<any> {
    try {
      return await UserWalk.execute({
        userId,
        mapId: "1234",
        x: 1,
        y: 1,
        // mapRepository,
        userRepository: config.repositories.userRepository,
      });
    } catch (error) {
      console.log(error);
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
