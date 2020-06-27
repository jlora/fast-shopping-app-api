import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orders,
  Customers,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersCustomersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.number('id') id: typeof Orders.prototype.id,
  ): Promise<Customers> {
    return this.ordersRepository.customer(id);
  }
}
