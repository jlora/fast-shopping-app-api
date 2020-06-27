import {Entity, hasMany, model, property} from '@loopback/repository';
import {CollectionsProducts} from './collections-products.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'shopping', table: 'collections'}}
})
export class Collections extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'title', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  title?: string;

  @property({
    type: 'string',
    length: 100,
    mysql: {columnName: 'imageUrl', dataType: 'varchar', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  imageUrl?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'linkUrl', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  linkUrl?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  createdAt: string;

  @hasMany(() => CollectionsProducts, {keyTo: 'collectionId'})
  collectionsProducts: CollectionsProducts[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Collections>) {
    super(data);
  }
}

export interface CollectionsRelations {
  // describe navigational properties here
}

export type CollectionsWithRelations = Collections & CollectionsRelations;
