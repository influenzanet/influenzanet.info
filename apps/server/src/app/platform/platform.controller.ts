import {Controller, Get} from '@nestjs/common';
import {Platform} from "@models/Platform";
import {InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";

@Controller('platform')
export class PlatformController {

  constructor(
    @InjectRepository(Platform) public platform: Repository<Platform>,
  ) {}

  @Get('/')
  async findAll(): Promise<Platform[]> {
    return await this.platform.find({relations: ['country'],})
  }

}
