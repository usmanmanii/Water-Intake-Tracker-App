import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
export class CreateWaterLogDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsDateString()
  date: string;
  @IsInt()
  @Min(1)
  intakeMl: number;
}
