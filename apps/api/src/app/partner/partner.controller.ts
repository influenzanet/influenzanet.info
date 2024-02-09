import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '@models/Partner';


@Controller('partner')
export class PartnerController {
  constructor(@InjectRepository(Partner) public partner: Repository<Partner>) {}

  @Get('/')
  async findAll(): Promise<Partner[]> {
    return await this.partner.find({ relations: ['platform'] });
  }
}
