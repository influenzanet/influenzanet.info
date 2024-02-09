import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerController } from './partner.controller';
import { Partner } from '@models/Partner';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  controllers: [PartnerController],
})
export class PartnerModule {}
