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
  Customers,
} from '../models';
import {ShoppingCartRepository} from '../repositories';

export class ShoppingCartCustomersController {
  constructor(
    @repository(ShoppingCartRepository)
    public shoppingCartRepository: ShoppingCartRepository,
  ) { }

  @get('/shopping-carts/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to ShoppingCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.number('id') id: typeof ShoppingCart.prototype.id,
  ): Promise<Customers> {
    return this.shoppingCartRepository.customer(id);
  }
}
