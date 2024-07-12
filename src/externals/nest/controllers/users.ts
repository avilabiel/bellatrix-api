import CreateUser from "@/app/use-cases/create-user";
import config from "@/config";
import User from "@/entities/User";
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
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
}
