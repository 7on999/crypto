import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { QueryDto } from './dto/get-currency-convert.dto';

interface Coin {
  key: string;
  price: number;
  volume: number;
}

export interface GetResponse extends QueryDto {
  result: number;
}

const URL = 'https://tstapi.cryptorank.io/v0/coins/prices/' as const;

@Injectable()
export class AppService {
  async get(dto: QueryDto): Promise<GetResponse> {
    const { from, to, amount } = dto;
    try {
      const response = await fetch(URL);
      const responseJson = await response.json();
      const data: Array<Coin> = responseJson.data;

      const fromInfo = data.find((coin) => coin.key === from);
      const toInfo = data.find((coin) => coin.key === to);

      if (!fromInfo || !toInfo)
        throw new HttpException(
          'Таких монет не существует',
          HttpStatus.BAD_REQUEST,
        );

      const result = (fromInfo.price / toInfo.price) * amount;
      return {
        ...dto,
        result,
      };
    } catch (e) {
      throw new HttpException('Что то пошло не так', HttpStatus.BAD_REQUEST);
    }
  }
}
