import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingCollectiveModule } from './parking-collective/parking-collective.module';
import 'dotenv/config';
// console.log(process.env.DB_URI);
@Module({
  imports: [
    //This configmodule is used to make the env variable accessbile throughout the folder structure
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ParkingCollectiveModule,
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
