import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CommandModule, CommandService } from 'nestjs-command';


async function bootstrap() {
  if (!process.env.IS_CLI && process.env.IS_CLI !== 'true') {
    const app = await NestFactory.create(AppModule, { cors: true });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(
      `🚀 NESTJS Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  } else {
    console.log('########## CLI ############');
    console.log('EXECUTING CLI COMMAND');

    // CLI
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    try {
      Logger.log(`🚀 Application is running in CLI mode.`);
      await app.select(CommandModule).get(CommandService).exec();
      await app.close();
    } catch (error) {
      console.error('########## CLI ERROR ############');
      console.error(error);
      await app.close();
      process.exit(1);
    }
  }
}

bootstrap();
