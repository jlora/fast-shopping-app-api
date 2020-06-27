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
  Products,
} from '../models';
import {CollectionsProductsRepository} from '../repositories';

export class CollectionsProductsProductsController {
  constructor(
    @repository(CollectionsProductsRepository)
    public collectionsProductsRepository: CollectionsProductsRepository,
  ) { }

  @get('/collections-products/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to CollectionsProducts',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.number('id') id: typeof CollectionsProducts.prototype.id,
  ): Promise<Products> {
    return this.collectionsProductsRepository.product(id);
  }
}
