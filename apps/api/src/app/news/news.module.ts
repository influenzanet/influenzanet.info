import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '@models/News';
import { NewsController } from './news.controller';
import { Tag } from '@models/Tag';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
})
export class NewsModule {}
