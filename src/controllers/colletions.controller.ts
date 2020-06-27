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
import {Collections} from '../models';
import {CollectionsRepository} from '../repositories';

export class ColletionsController {
  constructor(
    @repository(CollectionsRepository)
    public collectionsRepository : CollectionsRepository,
  ) {}

  @post('/collections', {
    responses: {
      '200': {
        description: 'Collections model instance',
        content: {'application/json': {schema: getModelSchemaRef(Collections)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Collections, {
            title: 'NewCollections',
            
          }),
        },
      },
    })
    collections: Collections,
  ): Promise<Collections> {
    return this.collectionsRepository.create(collections);
  }

  @get('/collections/count', {
    responses: {
      '200': {
        description: 'Collections model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Collections) where?: Where<Collections>,
  ): Promise<Count> {
    return this.collectionsRepository.count(where);
  }

  @get('/collections', {
    responses: {
      '200': {
        description: 'Array of Collections model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Collections, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Collections) filter?: Filter<Collections>,
  ): Promise<Collections[]> {
    return this.collectionsRepository.find(filter);
  }

  @patch('/collections', {
    responses: {
      '200': {
        description: 'Collections PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Collections, {partial: true}),
        },
      },
    })
    collections: Collections,
    @param.where(Collections) where?: Where<Collections>,
  ): Promise<Count> {
    return this.collectionsRepository.updateAll(collections, where);
  }

  @get('/collections/{id}', {
    responses: {
      '200': {
        description: 'Collections model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Collections, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Collections, {exclude: 'where'}) filter?: FilterExcludingWhere<Collections>
  ): Promise<Collections> {
    return this.collectionsRepository.findById(id, filter);
  }

  @patch('/collections/{id}', {
    responses: {
      '204': {
        description: 'Collections PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Collections, {partial: true}),
        },
      },
    })
    collections: Collections,
  ): Promise<void> {
    await this.collectionsRepository.updateById(id, collections);
  }

  @put('/collections/{id}', {
    responses: {
      '204': {
        description: 'Collections PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() collections: Collections,
  ): Promise<void> {
    await this.collectionsRepository.replaceById(id, collections);
  }

  @del('/collections/{id}', {
    responses: {
      '204': {
        description: 'Collections DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.collectionsRepository.deleteById(id);
  }
}
