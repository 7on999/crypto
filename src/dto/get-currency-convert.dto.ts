import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    example: 100,
    description: 'Количество монет которое конвертируем',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public amount = 1;

  @ApiProperty({
    example: 'luna',
    description: 'Ключ монеты из которой конвертируем',
  })
  @IsString()
  @IsNotEmpty()
  public from: string;

  @ApiProperty({
    example: 'bitcoin',
    description: 'Ключ монеты в которую конвертируем',
  })
  @IsString()
  @IsOptional()
  public to = 'tether';
}
