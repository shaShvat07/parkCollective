// app.module.ts
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingCollectiveModule } from './parking-collective/parking-collective.module';
import { ChatGPTModule } from './chat-gpt/chat-gpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ParkingCollectiveModule,
    ChatGPTModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
