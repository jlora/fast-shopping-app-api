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
  ShoppingCart,
} from '../models';
import {ShoppingCartItemsRepository} from '../repositories';

export class ShoppingCartItemsShoppingCartController {
  constructor(
    @repository(ShoppingCartItemsRepository)
    public shoppingCartItemsRepository: ShoppingCartItemsRepository,
  ) { }

  @get('/shopping-cart-items/{id}/shopping-cart', {
    responses: {
      '200': {
        description: 'ShoppingCart belonging to ShoppingCartItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ShoppingCart)},
          },
        },
      },
    },
  })
  async getShoppingCart(
    @param.path.number('id') id: typeof ShoppingCartItems.prototype.id,
  ): Promise<ShoppingCart> {
    return this.shoppingCartItemsRepository.shoppingCart(id);
  }
}
