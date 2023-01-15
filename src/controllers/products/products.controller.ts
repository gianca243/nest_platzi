import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { ProductsService } from './../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // primero debe ir los parametros no dinamicos
  @Get('/filter')
  getProductFilter() {
    return {
      message: `soy un filtro`,
    };
  }

  //query params
  @Get('')
  getProducts(@Query() params: any) {
    const { limit, offset } = params;
    return {
      message: `Products: limit=> ${limit} offset= ${offset}`,
    };
  }

  @Get('S')
  getProductsS(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
    /* return {
      message: `Products: limit=> ${limit} offset= ${offset} brand= ${brand}`,
    }; */
  }

  // Si se define un response de express se anula la posibilidad de que nest genere una respuesta
  //y siempre se quedara esperando a que el response retorne una respuesta
  //4 later: @Res() response: Response,
  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param() params: any) {
    /* response.status(200).send({
      message: `product ${params.productId}`,
    }); */
    return this.productsService.findOne(+params.productId);
  }

  @Post()
  create(@Body() payload: any) {
    /* return {
      message: 'crear',
      payload,
    }; */
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    /* return {
      message: 'crear',
      payload,
      id,
    }; */
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
