import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ShoppingCartItems,
  Products,
} from '../models';
import {ShoppingCartItemsRepository} from '../repositories';

export class ShoppingCartItemsProductsController {
  constructor(
    @repository(ShoppingCartItemsRepository)
    public shoppingCartItemsRepository: ShoppingCartItemsRepository,
  ) { }

  @get('/shopping-cart-items/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to ShoppingCartItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.number('id') id: typeof ShoppingCartItems.prototype.id,
  ): Promise<Products> {
    return this.shoppingCartItemsRepository.product(id);
  }
}
