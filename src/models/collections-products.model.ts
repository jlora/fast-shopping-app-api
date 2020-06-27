import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Collections} from './collections.model';
import {Products} from './products.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'shopping', table: 'collections_products'},
  },
})
export class CollectionsProducts extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  id: number;
  @property({
    type: 'date',
    required: true,
    mysql: {
      columnName: 'createdAt',
      dataType: 'datetime',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  createdAt: string;

  @belongsTo(() => Products)
  productId: number;

  @belongsTo(() => Collections)
  collectionId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CollectionsProducts>) {
    super(data);
  }
}

export interface CollectionsProductsRelations {
  // describe navigational properties here
}

export type CollectionsProductsWithRelations = CollectionsProducts &
  CollectionsProductsRelations;
