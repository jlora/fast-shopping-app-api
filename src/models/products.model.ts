import { Entity, hasMany, model, property } from '@loopback/repository';
import { CollectionsProducts, CollectionsProductsWithRelations } from './collections-products.model';

@model({ settings: { idInjection: false, mysql: { schema: 'shopping', table: 'products' } } })
export class Products extends Entity {
	@property({
		type: 'number',
		required: true,
		precision: 10,
		scale: 0,
		id: 1,
		mysql: { columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N' }
	})
	id: number;

	@property({
		type: 'string',
		length: 100,
		mysql: {
			columnName: 'imageUrl',
			dataType: 'varchar',
			dataLength: 100,
			dataPrecision: null,
			dataScale: null,
			nullable: 'Y'
		}
	})
	imageUrl?: string;

	@property({
		type: 'string',
		required: true,
		length: 45,
		mysql: {
			columnName: 'name',
			dataType: 'varchar',
			dataLength: 45,
			dataPrecision: null,
			dataScale: null,
			nullable: 'N'
		}
	})
	name: string;

	@property({
		type: 'number',
		required: true,
		precision: 10,
		scale: 0,
		mysql: {
			columnName: 'price',
			dataType: 'decimal',
			dataLength: null,
			dataPrecision: 10,
			dataScale: 0,
			nullable: 'N'
		}
	})
	price: number;

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

	@hasMany(() => CollectionsProducts, { keyTo: 'productId' })
	collectionsProducts: CollectionsProducts[];
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<Products>) {
		super(data);
	}
}

export interface ProductsRelations {
	// describe navigational properties here
	collectionsProducts?: CollectionsProductsWithRelations[];
}

export type ProductsWithRelations = Products & ProductsRelations;
