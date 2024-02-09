import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '@models/Tag';


@Controller('tag')
export class TagController {
  constructor(@InjectRepository(Tag) public tag: Repository<Tag>) {}

  @Get('/')
  async findAll(): Promise<Tag[]> {
    return await this.tag.find({});
  }
}
