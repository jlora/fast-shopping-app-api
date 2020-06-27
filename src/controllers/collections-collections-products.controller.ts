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
  Collections,
  CollectionsProducts,
} from '../models';
import {CollectionsRepository} from '../repositories';

export class CollectionsCollectionsProductsController {
  constructor(
    @repository(CollectionsRepository) protected collectionsRepository: CollectionsRepository,
  ) { }

  @get('/collections/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Array of Collections has many CollectionsProducts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CollectionsProducts)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CollectionsProducts>,
  ): Promise<CollectionsProducts[]> {
    return this.collectionsRepository.collectionsProducts(id).find(filter);
  }

  @post('/collections/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Collections model instance',
        content: {'application/json': {schema: getModelSchemaRef(CollectionsProducts)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Collections.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {
            title: 'NewCollectionsProductsInCollections',
            exclude: ['id'],
            optional: ['collectionId']
          }),
        },
      },
    }) collectionsProducts: Omit<CollectionsProducts, 'id'>,
  ): Promise<CollectionsProducts> {
    return this.collectionsRepository.collectionsProducts(id).create(collectionsProducts);
  }

  @patch('/collections/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Collections.CollectionsProducts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {partial: true}),
        },
      },
    })
    collectionsProducts: Partial<CollectionsProducts>,
    @param.query.object('where', getWhereSchemaFor(CollectionsProducts)) where?: Where<CollectionsProducts>,
  ): Promise<Count> {
    return this.collectionsRepository.collectionsProducts(id).patch(collectionsProducts, where);
  }

  @del('/collections/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Collections.CollectionsProducts DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CollectionsProducts)) where?: Where<CollectionsProducts>,
  ): Promise<Count> {
    return this.collectionsRepository.collectionsProducts(id).delete(where);
  }
}
