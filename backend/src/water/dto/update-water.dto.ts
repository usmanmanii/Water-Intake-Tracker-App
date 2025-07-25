import { PartialType } from '@nestjs/mapped-types';
import { CreateWaterLogDto } from './create-water.dto';
export class UpdateWaterDto extends PartialType(CreateWaterLogDto) {}
