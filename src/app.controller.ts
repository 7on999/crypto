import { Controller, Get, Query, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService, GetResponse } from './app.service';

import { QueryDto } from './dto/get-currency-convert.dto';

@ApiTags('Конвертер криптовалют')
@ApiResponse({ type: Number })
@Controller('/currency/convert')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get(
    @Query() dto: QueryDto,
    @Res() res: Response,
  ): Promise<Response<GetResponse>> {
    const response = await this.appService.get(dto);

    return res.status(HttpStatus.FOUND).json(response);
  }
}
