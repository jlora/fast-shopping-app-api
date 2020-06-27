import {Entity, hasMany, model, property} from '@loopback/repository';
import {Orders} from './orders.model';
import {ShoppingCart} from './shopping-cart.model';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'shopping', table: 'customers'},
  },
})
export class Customers extends Entity {
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
    type: 'string',
    length: 100,
    mysql: {
      columnName: 'fullName',
      dataType: 'varchar',
      dataLength: 100,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  fullName?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'identifier',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  identifier?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {
      columnName: 'address',
      dataType: 'varchar',
      dataLength: 255,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  address?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {
      columnName: 'phone',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'Y',
    },
  })
  phone?: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  email: string;

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

  @hasMany(() => Orders, {keyTo: 'customerId'})
  orders: Orders[];

  @hasMany(() => ShoppingCart, {keyTo: 'customerId'})
  shoppingCarts: ShoppingCart[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
