import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from '@models/Publication';
import { PublicationController } from './publication.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Publication])],
  controllers: [PublicationController],
})
export class PublicationModule {}
