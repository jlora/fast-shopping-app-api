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
  ShoppingCart,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersShoppingCartController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/shopping-carts', {
    responses: {
      '200': {
        description: 'Array of Customers has many ShoppingCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ShoppingCart)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ShoppingCart>,
  ): Promise<ShoppingCart[]> {
    return this.customersRepository.shoppingCarts(id).find(filter);
  }

  @post('/customers/{id}/shopping-carts', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShoppingCart)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {
            title: 'NewShoppingCartInCustomers',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) shoppingCart: Omit<ShoppingCart, 'id'>,
  ): Promise<ShoppingCart> {
    return this.customersRepository.shoppingCarts(id).create(shoppingCart);
  }

  @patch('/customers/{id}/shopping-carts', {
    responses: {
      '200': {
        description: 'Customers.ShoppingCart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {partial: true}),
        },
      },
    })
    shoppingCart: Partial<ShoppingCart>,
    @param.query.object('where', getWhereSchemaFor(ShoppingCart)) where?: Where<ShoppingCart>,
  ): Promise<Count> {
    return this.customersRepository.shoppingCarts(id).patch(shoppingCart, where);
  }

  @del('/customers/{id}/shopping-carts', {
    responses: {
      '200': {
        description: 'Customers.ShoppingCart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ShoppingCart)) where?: Where<ShoppingCart>,
  ): Promise<Count> {
    return this.customersRepository.shoppingCarts(id).delete(where);
  }
}
