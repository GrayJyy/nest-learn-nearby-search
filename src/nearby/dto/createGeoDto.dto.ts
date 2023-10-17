import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';
export class CreateGeoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  member: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
