import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ShoppingCartItems} from '../models';
import {ShoppingCartItemsRepository} from '../repositories';

export class ShoppingcartitemsController {
  constructor(
    @repository(ShoppingCartItemsRepository)
    public shoppingCartItemsRepository : ShoppingCartItemsRepository,
  ) {}

  @post('/shopping-cart-items', {
    responses: {
      '200': {
        description: 'ShoppingCartItems model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShoppingCartItems)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCartItems, {
            title: 'NewShoppingCartItems',
            
          }),
        },
      },
    })
    shoppingCartItems: ShoppingCartItems,
  ): Promise<ShoppingCartItems> {
    return this.shoppingCartItemsRepository.create(shoppingCartItems);
  }

  @get('/shopping-cart-items/count', {
    responses: {
      '200': {
        description: 'ShoppingCartItems model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ShoppingCartItems) where?: Where<ShoppingCartItems>,
  ): Promise<Count> {
    return this.shoppingCartItemsRepository.count(where);
  }

  @get('/shopping-cart-items', {
    responses: {
      '200': {
        description: 'Array of ShoppingCartItems model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ShoppingCartItems, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ShoppingCartItems) filter?: Filter<ShoppingCartItems>,
  ): Promise<ShoppingCartItems[]> {
    return this.shoppingCartItemsRepository.find(filter);
  }

  @patch('/shopping-cart-items', {
    responses: {
      '200': {
        description: 'ShoppingCartItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCartItems, {partial: true}),
        },
      },
    })
    shoppingCartItems: ShoppingCartItems,
    @param.where(ShoppingCartItems) where?: Where<ShoppingCartItems>,
  ): Promise<Count> {
    return this.shoppingCartItemsRepository.updateAll(shoppingCartItems, where);
  }

  @get('/shopping-cart-items/{id}', {
    responses: {
      '200': {
        description: 'ShoppingCartItems model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ShoppingCartItems, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ShoppingCartItems, {exclude: 'where'}) filter?: FilterExcludingWhere<ShoppingCartItems>
  ): Promise<ShoppingCartItems> {
    return this.shoppingCartItemsRepository.findById(id, filter);
  }

  @patch('/shopping-cart-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCartItems PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCartItems, {partial: true}),
        },
      },
    })
    shoppingCartItems: ShoppingCartItems,
  ): Promise<void> {
    await this.shoppingCartItemsRepository.updateById(id, shoppingCartItems);
  }

  @put('/shopping-cart-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCartItems PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shoppingCartItems: ShoppingCartItems,
  ): Promise<void> {
    await this.shoppingCartItemsRepository.replaceById(id, shoppingCartItems);
  }

  @del('/shopping-cart-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCartItems DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shoppingCartItemsRepository.deleteById(id);
  }
}
