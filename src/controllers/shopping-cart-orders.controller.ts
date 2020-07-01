import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ShoppingCart,
  Orders,
} from '../models';
import {ShoppingCartRepository} from '../repositories';

export class ShoppingCartOrdersController {
  constructor(
    @repository(ShoppingCartRepository)
    public shoppingCartRepository: ShoppingCartRepository,
  ) { }

  @get('/shopping-carts/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to ShoppingCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof ShoppingCart.prototype.id,
  ): Promise<Orders> {
    return this.shoppingCartRepository.order(id);
  }
}
