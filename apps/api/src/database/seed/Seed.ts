import countrySeed from './country.json';
import platformSeed from './platform.json';
import publicationSeed from './publication.json';
import partnerSeed from './partner.json';
import { DataSource } from 'typeorm';
import { Country } from '@models/Country';
import { Platform } from '@models/Platform';
import { Publication } from '@models/Publication';
import { Partner } from '@models/Partner';

export const initialSeed = async (dataSource: DataSource) => {
  let countryRepository = dataSource.getRepository(Country);
  let platformRepository = dataSource.getRepository(Platform);
  let publicationRepository = dataSource.getRepository(Publication);
  let partnerRepository = dataSource.getRepository(Partner);

  let seeded = [];

  if ((await countryRepository.count()) <= 0) {
    console.log('SEEDING COUNTRY DATA');
    const countrySeedResults = await countryRepository.save(countrySeed);
    seeded.push('country');
  }

  if ((await platformRepository.count()) <= 0) {
    console.log('SEEDING PLATFORM DATA');
    const platformSeedResults = await platformRepository.save(platformSeed);
    seeded.push('platform');
  }

  if ((await publicationRepository.count()) <= 0) {
    console.log('SEEDING PUBLICATION DATA');
    await publicationRepository.save(publicationSeed);
    seeded.push('publication');
  }

  if ((await partnerRepository.count()) <= 0) {
    console.log('SEEDING PARTNER DATA');
    await partnerRepository.save(partnerSeed);
    seeded.push('partner');
  }

  if (seeded.length > 0) {
    console.log('\x1b[0m%s\x1b[0m', 'SEED DATABASE', '\x1b[32m', '✓', '\x1b[0m');
  }
  else {
    console.log(
      '\x1b[0m%s\x1b[0m',
      'SEED DATABASE',
      '\x1b[33m',
      '✓ (0 TABLES TO SEED)',
      '\x1b[0m',
    );
  }
};
