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
  Orders,
  ShoppingCart,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersShoppingCartController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/shopping-cart', {
    responses: {
      '200': {
        description: 'Orders has one ShoppingCart',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ShoppingCart),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ShoppingCart>,
  ): Promise<ShoppingCart> {
    return this.ordersRepository.shoppingCart(id).get(filter);
  }

  @post('/orders/{id}/shopping-cart', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShoppingCart)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {
            title: 'NewShoppingCartInOrders',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) shoppingCart: Omit<ShoppingCart, 'id'>,
  ): Promise<ShoppingCart> {
    return this.ordersRepository.shoppingCart(id).create(shoppingCart);
  }

  @patch('/orders/{id}/shopping-cart', {
    responses: {
      '200': {
        description: 'Orders.ShoppingCart PATCH success count',
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
    return this.ordersRepository.shoppingCart(id).patch(shoppingCart, where);
  }

  @del('/orders/{id}/shopping-cart', {
    responses: {
      '200': {
        description: 'Orders.ShoppingCart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ShoppingCart)) where?: Where<ShoppingCart>,
  ): Promise<Count> {
    return this.ordersRepository.shoppingCart(id).delete(where);
  }
}
