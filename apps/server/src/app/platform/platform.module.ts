import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Platform} from "@models/Platform";
import {PlatformController} from "./platform.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  controllers: [PlatformController],
})
export class PlatformModule {}
