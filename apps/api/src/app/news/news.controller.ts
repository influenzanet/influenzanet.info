import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '@models/News';
@Controller('news')
export class NewsController {
  constructor(
    @InjectRepository(News)
    public newsRepository: Repository<News>,
  ) {}

  @Get('/')
  async findAll(): Promise<News[]> {
    return await this.newsRepository.find({ relations: ['tag'] });
  }
}
