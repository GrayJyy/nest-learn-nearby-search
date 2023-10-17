import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NearbyService } from './nearby.service';
import { CreateGeoDto } from './dto/createGeoDto.dto';

@Controller('nearby')
export class NearbyController {
  constructor(private readonly nearbyService: NearbyService) {}

  @Post('addGeo')
  async addGeo(@Body() geoDto: CreateGeoDto) {
    return await this.nearbyService.addGeo(geoDto);
  }

  @Get('getGeo')
  async getGeo(@Query('key') key: string, @Query('member') member: string) {
    return await this.nearbyService.getGeo({ key, member });
  }

  @Get('getAllGeo')
  async getAllGeo(@Query('key') key: string) {
    return await this.nearbyService.getAllGeo(key);
  }

  @Get('geoSearch')
  async geoSearch(
    @Query()
    {
      key,
      longitude,
      latitude,
      radius,
    }: {
      key: string;
      longitude: number;
      latitude: number;
      radius: number;
    },
  ) {
    return await this.nearbyService.geoSearch(
      key,
      [longitude, latitude],
      radius,
    );
  }
}
