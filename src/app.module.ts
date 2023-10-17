import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { NearbyModule } from './nearby/nearby.module';

@Module({
  imports: [RedisModule, NearbyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
