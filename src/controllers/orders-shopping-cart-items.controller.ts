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
  ShoppingCartItems,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersShoppingCartItemsController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/shopping-cart-items', {
    responses: {
      '200': {
        description: 'Array of Orders has many ShoppingCartItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ShoppingCartItems)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ShoppingCartItems>,
  ): Promise<ShoppingCartItems[]> {
    return this.ordersRepository.shoppingCartItems(id).find(filter);
  }

  @post('/orders/{id}/shopping-cart-items', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShoppingCartItems)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Orders.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCartItems, {
            title: 'NewShoppingCartItemsInOrders',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) shoppingCartItems: Omit<ShoppingCartItems, 'id'>,
  ): Promise<ShoppingCartItems> {
    return this.ordersRepository.shoppingCartItems(id).create(shoppingCartItems);
  }

  @patch('/orders/{id}/shopping-cart-items', {
    responses: {
      '200': {
        description: 'Orders.ShoppingCartItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCartItems, {partial: true}),
        },
      },
    })
    shoppingCartItems: Partial<ShoppingCartItems>,
    @param.query.object('where', getWhereSchemaFor(ShoppingCartItems)) where?: Where<ShoppingCartItems>,
  ): Promise<Count> {
    return this.ordersRepository.shoppingCartItems(id).patch(shoppingCartItems, where);
  }

  @del('/orders/{id}/shopping-cart-items', {
    responses: {
      '200': {
        description: 'Orders.ShoppingCartItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ShoppingCartItems)) where?: Where<ShoppingCartItems>,
  ): Promise<Count> {
    return this.ordersRepository.shoppingCartItems(id).delete(where);
  }
}
