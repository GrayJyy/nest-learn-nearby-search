import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateGeoDto } from './dto/createGeoDto.dto';
import { RedisService } from 'src/redis/redis.service';
import { GetGeoDto } from './dto/getGeoDto.dto';

@Injectable()
export class NearbyService {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async addGeo(createGeoDto: CreateGeoDto) {
    const { member, longitude, latitude } = createGeoDto;
    try {
      await this.redisService.addGeo('location', member, [longitude, latitude]);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return new HttpException('新增位置成功', HttpStatus.OK);
  }

  async getGeo(getGeoDto: GetGeoDto) {
    return await this.redisService.getGeo(getGeoDto);
  }

  async getAllGeo(key: string) {
    return await this.redisService.getAllGeo(key);
  }

  async geoSearch(key: string, pos: [number, number], radius: number) {
    const _res = await this.redisService.geoSearch(key, pos, radius);
    if (_res.length === 0) return `当前坐标附近 ${radius} km 内不存在对象`;
    return _res;
  }
}
