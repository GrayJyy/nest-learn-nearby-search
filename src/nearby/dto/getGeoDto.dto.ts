import { IsNotEmpty, IsString } from 'class-validator';
export class GetGeoDto {
  @IsNotEmpty()
  @IsString()
  key: string;
  @IsNotEmpty()
  @IsString()
  member: string;
}
