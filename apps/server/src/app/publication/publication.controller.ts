import {Controller, Get} from '@nestjs/common';
import { InjectRepository} from "@nestjs/typeorm";
import { Repository} from "typeorm";
import {Publication} from "@models/Publication";

@Controller('publication')
export class PublicationController {
  constructor(@InjectRepository(Publication) public publication: Repository<Publication>) {}

  @Get('/')
  async findAll(): Promise<Publication[]> {
    return await this.publication.find({})
  }
}
