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
  Orders,
} from '../models';
import {ShoppingCartItemsRepository} from '../repositories';

export class ShoppingCartItemsOrdersController {
  constructor(
    @repository(ShoppingCartItemsRepository)
    public shoppingCartItemsRepository: ShoppingCartItemsRepository,
  ) { }

  @get('/shopping-cart-items/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to ShoppingCartItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof ShoppingCartItems.prototype.id,
  ): Promise<Orders> {
    return this.shoppingCartItemsRepository.order(id);
  }
}
