import { Entity, hasMany, model, property } from '@loopback/repository';
import { ShoppingCart } from './shopping-cart.model';
import {Orders} from './orders.model';

@model({ settings: { idInjection: false, mysql: { schema: 'shopping', table: 'users' } } })
export class Users extends Entity {
	@property({
		type: 'string',
		required: true,
		length: 255,
		id: 1,
		mysql: {
			columnName: 'id',
			dataType: 'varchar',
			dataLength: 255,
			dataPrecision: null,
			dataScale: null,
			nullable: 'N'
		}
	})
	id: string;

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
			nullable: 'N'
		}
	})
	email: string;

	@property({
		type: 'string',
		length: 45,
		mysql: {
			columnName: 'displayName',
			dataType: 'varchar',
			dataLength: 45,
			dataPrecision: null,
			dataScale: null,
			nullable: 'Y'
		}
	})
	displayName?: string;

	@property({
		type: 'string',
		length: 256,
		mysql: {
			columnName: 'address',
			dataType: 'varchar',
			dataLength: 256,
			dataPrecision: null,
			dataScale: null,
			nullable: 'Y'
		}
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
			nullable: 'Y'
		}
	})
	phone?: string;

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

	@hasMany(() => ShoppingCart, { keyTo: 'userId' })
	shoppingCarts: ShoppingCart[];

  @hasMany(() => Orders, {keyTo: 'userId'})
  orders: Orders[];
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<Users>) {
		super(data);
	}
}

export interface UsersRelations {
	// describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
