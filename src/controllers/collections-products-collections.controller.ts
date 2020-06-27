import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CollectionsProducts,
  Collections,
} from '../models';
import {CollectionsProductsRepository} from '../repositories';

export class CollectionsProductsCollectionsController {
  constructor(
    @repository(CollectionsProductsRepository)
    public collectionsProductsRepository: CollectionsProductsRepository,
  ) { }

  @get('/collections-products/{id}/collections', {
    responses: {
      '200': {
        description: 'Collections belonging to CollectionsProducts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Collections)},
          },
        },
      },
    },
  })
  async getCollections(
    @param.path.number('id') id: typeof CollectionsProducts.prototype.id,
  ): Promise<Collections> {
    return this.collectionsProductsRepository.collection(id);
  }
}
