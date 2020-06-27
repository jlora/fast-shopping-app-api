import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Users } from './users.model';
import {Customers} from './customers.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'shopping', table: 'shopping_cart'}}
})
export class ShoppingCart extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'}
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
      nullable: 'N'
    }
  })
  createdAt: string;

  @belongsTo(() => Users)
  userId: string;

  @belongsTo(() => Customers)
  customerId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ShoppingCart>) {
    super(data);
  }
}

export interface ShoppingCartRelations {
	// describe navigational properties here
}

export type ShoppingCartWithRelations = ShoppingCart & ShoppingCartRelations;
