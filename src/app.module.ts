import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingCollectiveModule } from './parking-collective/parking-collective.module';
import { ProjectUnitModule } from './project-unit/project-unit.module';
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
    ProjectUnitModule,
    MongooseModule.forRoot(process.env.DB_URI),
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
