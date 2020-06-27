import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customers,
  Orders,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersOrdersController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Customers has many Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.customersRepository.orders(id).find(filter);
  }

  @post('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orders)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrdersInCustomers',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.customersRepository.orders(id).create(orders);
  }

  @patch('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Orders PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Partial<Orders>,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).patch(orders, where);
  }

  @del('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Orders DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).delete(where);
  }
}
