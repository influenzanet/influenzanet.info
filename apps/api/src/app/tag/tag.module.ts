import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { Tag } from '@models/Tag';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
})
export class TagModule {}
