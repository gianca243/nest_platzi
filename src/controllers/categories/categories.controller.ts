import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  //path params example
  @Get('/:id/product/:productId')
  getProductSimple(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ) {
    return `product ${productId} and ${id}`;
  }
}
