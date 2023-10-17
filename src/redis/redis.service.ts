import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { GetGeoDto } from 'src/nearby/dto/getGeoDto.dto';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async addGeo(key: string, member: string, posLoc: [number, number]) {
    await this.redisClient.geoAdd(key, {
      longitude: posLoc[0],
      latitude: posLoc[1],
      member,
    });
  }

  async getGeo({ member, key }: GetGeoDto) {
    let _res: Array<{
      longitude: string | Buffer;
      latitude: string | Buffer;
    } | null>;
    try {
      _res = await this.redisClient.geoPos(key, member);
    } catch (error) {
      throw new BadRequestException(error);
    }
    if (_res[0] === null)
      throw new BadRequestException('查询不到对应的位置信息');
    return {
      member,
      longitude: _res[0].longitude,
      latitude: _res[0].latitude,
    };
  }

  async getAllGeo(key: string) {
    const _list = [];
    const _locations = await this.redisClient.zRange(key, 0, -1);
    if (_locations.length === 0)
      throw new BadRequestException('暂无相关位置信息');
    for (const element of _locations) {
      const _item = await this.getGeo({ key, member: element });
      _list.push(_item);
    }
    return _list;
  }

  async geoSearch(key: string, pos: [number, number], radius: number) {
    const _res = await this.redisClient.geoRadius(
      key,
      {
        longitude: pos[0],
        latitude: pos[1],
      },
      radius,
      'km',
    );
    console.log(_res);

    return _res;
  }
}
