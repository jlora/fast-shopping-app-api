import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orders} from './orders.model';
import {Products} from './products.model';
import {ShoppingCart} from './shopping-cart.model';

@model({
  settings: {idInjection: false, mysql: {schema: 'shopping', table: 'shopping_cart_items'}}
})
export class ShoppingCartItems extends Entity {
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
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'quantity', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  quantity?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'price', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  price?: number;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'createdAt', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  createdAt: string;

  @belongsTo(() => Orders)
  orderId: number;

  @belongsTo(() => Products)
  productId: number;

  @belongsTo(() => ShoppingCart)
  shoppingCartId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ShoppingCartItems>) {
    super(data);
  }
}

export interface ShoppingCartItemsRelations {
  // describe navigational properties here
}

export type ShoppingCartItemsWithRelations = ShoppingCartItems & ShoppingCartItemsRelations;
