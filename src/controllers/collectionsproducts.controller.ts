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
import {CollectionsProducts} from '../models';
import {CollectionsProductsRepository} from '../repositories';

export class CollectionsproductsController {
  constructor(
    @repository(CollectionsProductsRepository)
    public collectionsProductsRepository : CollectionsProductsRepository,
  ) {}

  @post('/collections-products', {
    responses: {
      '200': {
        description: 'CollectionsProducts model instance',
        content: {'application/json': {schema: getModelSchemaRef(CollectionsProducts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {
            title: 'NewCollectionsProducts',
            
          }),
        },
      },
    })
    collectionsProducts: CollectionsProducts,
  ): Promise<CollectionsProducts> {
    return this.collectionsProductsRepository.create(collectionsProducts);
  }

  @get('/collections-products/count', {
    responses: {
      '200': {
        description: 'CollectionsProducts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CollectionsProducts) where?: Where<CollectionsProducts>,
  ): Promise<Count> {
    return this.collectionsProductsRepository.count(where);
  }

  @get('/collections-products', {
    responses: {
      '200': {
        description: 'Array of CollectionsProducts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CollectionsProducts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CollectionsProducts) filter?: Filter<CollectionsProducts>,
  ): Promise<CollectionsProducts[]> {
    return this.collectionsProductsRepository.find(filter);
  }

  @patch('/collections-products', {
    responses: {
      '200': {
        description: 'CollectionsProducts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {partial: true}),
        },
      },
    })
    collectionsProducts: CollectionsProducts,
    @param.where(CollectionsProducts) where?: Where<CollectionsProducts>,
  ): Promise<Count> {
    return this.collectionsProductsRepository.updateAll(collectionsProducts, where);
  }

  @get('/collections-products/{id}', {
    responses: {
      '200': {
        description: 'CollectionsProducts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CollectionsProducts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CollectionsProducts, {exclude: 'where'}) filter?: FilterExcludingWhere<CollectionsProducts>
  ): Promise<CollectionsProducts> {
    return this.collectionsProductsRepository.findById(id, filter);
  }

  @patch('/collections-products/{id}', {
    responses: {
      '204': {
        description: 'CollectionsProducts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {partial: true}),
        },
      },
    })
    collectionsProducts: CollectionsProducts,
  ): Promise<void> {
    await this.collectionsProductsRepository.updateById(id, collectionsProducts);
  }

  @put('/collections-products/{id}', {
    responses: {
      '204': {
        description: 'CollectionsProducts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() collectionsProducts: CollectionsProducts,
  ): Promise<void> {
    await this.collectionsProductsRepository.replaceById(id, collectionsProducts);
  }

  @del('/collections-products/{id}', {
    responses: {
      '204': {
        description: 'CollectionsProducts DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.collectionsProductsRepository.deleteById(id);
  }
}
