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
  Products,
  CollectionsProducts,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCollectionsProductsController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Array of Products has many CollectionsProducts',
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
    return this.productsRepository.collectionsProducts(id).find(filter);
  }

  @post('/products/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(CollectionsProducts)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionsProducts, {
            title: 'NewCollectionsProductsInProducts',
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) collectionsProducts: Omit<CollectionsProducts, 'id'>,
  ): Promise<CollectionsProducts> {
    return this.productsRepository.collectionsProducts(id).create(collectionsProducts);
  }

  @patch('/products/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Products.CollectionsProducts PATCH success count',
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
    return this.productsRepository.collectionsProducts(id).patch(collectionsProducts, where);
  }

  @del('/products/{id}/collections-products', {
    responses: {
      '200': {
        description: 'Products.CollectionsProducts DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CollectionsProducts)) where?: Where<CollectionsProducts>,
  ): Promise<Count> {
    return this.productsRepository.collectionsProducts(id).delete(where);
  }
}
