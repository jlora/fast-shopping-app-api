import { Getter, inject } from '@loopback/core';
import {
	AnyObject,
	BelongsToAccessor,
	DefaultCrudRepository,
	DefaultTransactionalRepository,
	HasManyRepositoryFactory,
	HasOneRepositoryFactory,
	IsolationLevel,
	repository
} from '@loopback/repository';
import { ShoppingDataSource } from '../datasources';
import { Customers, Orders, OrdersRelations, ShoppingCart, ShoppingCartItems, Users } from '../models';
import { CustomersRepository } from './customers.repository';
import { ShoppingCartItemsRepository } from './shopping-cart-items.repository';
import { ShoppingCartRepository } from './shopping-cart.repository';
import { UsersRepository } from './users.repository';

export class OrdersRepository extends DefaultCrudRepository<Orders, typeof Orders.prototype.id, OrdersRelations> {
	public readonly user: BelongsToAccessor<Users, typeof Orders.prototype.id>;

	public readonly shoppingCartItems: HasManyRepositoryFactory<ShoppingCartItems, typeof Orders.prototype.id>;

	public readonly customer: BelongsToAccessor<Customers, typeof Orders.prototype.id>;

	public readonly shoppingCart: HasOneRepositoryFactory<ShoppingCart, typeof Orders.prototype.id>;

	constructor(
		@inject('datasources.shopping') dataSource: ShoppingDataSource,
		@repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
		@repository.getter('ShoppingCartItemsRepository')
		protected shoppingCartItemsRepositoryGetter: Getter<ShoppingCartItemsRepository>,
		@repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
		@repository.getter('ShoppingCartRepository')
		protected shoppingCartRepositoryGetter: Getter<ShoppingCartRepository>,
		@repository(CustomersRepository) private customerFunctions: CustomersRepository
	) {
		super(Orders, dataSource);
		this.shoppingCart = this.createHasOneRepositoryFactoryFor('shoppingCart', shoppingCartRepositoryGetter);
		this.registerInclusionResolver('shoppingCart', this.shoppingCart.inclusionResolver);
		this.customer = this.createBelongsToAccessorFor('customer', customersRepositoryGetter);
		this.registerInclusionResolver('customer', this.customer.inclusionResolver);
		this.shoppingCartItems = this.createHasManyRepositoryFactoryFor(
			'shoppingCartItems',
			shoppingCartItemsRepositoryGetter
		);
		this.registerInclusionResolver('shoppingCartItems', this.shoppingCartItems.inclusionResolver);
		this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter);
		this.registerInclusionResolver('user', this.user.inclusionResolver);
	}

	public async createOrderConfirmed(data: AnyObject) {
		// create transaction
		const customerRepo = new DefaultTransactionalRepository(Customers, this.dataSource);
		const orderRepo = new DefaultTransactionalRepository(Orders, this.dataSource);
		const shoppingCartRepo = new DefaultTransactionalRepository(ShoppingCart, this.dataSource);
		const shoppingCartItemRepo = new DefaultTransactionalRepository(ShoppingCartItems, this.dataSource);
		const customerTx = await customerRepo.beginTransaction(IsolationLevel.READ_COMMITTED);
		const orderTx = await orderRepo.beginTransaction(IsolationLevel.READ_COMMITTED);
		const shoppingCartTx = await shoppingCartRepo.beginTransaction(IsolationLevel.READ_COMMITTED);
		const shoppingCartItemTx = await shoppingCartItemRepo.beginTransaction(IsolationLevel.READ_COMMITTED);
		//try {
		console.log('data:', data);
		// Verificar si el cliente existe, si no crearlo
		let customer = { id: 0 };
		if (data.customer && data.customer.id) {
			customer = await this.customerFunctions.findById(data.customer.id);
		} else {
			const customerItem = data.customer;
			// Crear cliente
			const customerToSave = {
				id: 0,
				fullName: customerItem.fullName,
				identifier: customerItem.fullName.replace(' ', ''),
				address: customerItem.address,
				phone: customerItem.phone,
				email: customerItem.email,
				createdAt: new Date().toString()
			};
			customer = await customerRepo.create(customerToSave, { transaction: customerTx });
			await customerTx.commit();
		}
		// crear orders
		let total = 0;
		for (const item of data.cart) {
			total += item.price;
		}
		const orderToSave = {
			id: 0,
			userId: data.user.id,
			total,
			customerId: customer.id,
			createdAt: new Date().toString()
		};
		const order = await orderRepo.create(orderToSave, { transaction: orderTx });
		await orderTx.commit();
		// Guardar shopping cart
		const shopCart = {
			id: 0,
			userId: data.user.id,
			orderId: order.id,
			customerId: customer.id,
			createdAt: new Date().toString()
		};
		const shoppingCart = await shoppingCartRepo.create(shopCart, { transaction: shoppingCartTx });
		await shoppingCartTx.commit();
		// Guardar shopping cart ITEMS
		const shoppingCartItems = [];
		for (const shopItem of data.cart) {
			const shopCartItem = {
				id: 0,
				shoppingCartId: shoppingCart.id,
				productId: shopItem.id,
				orderId: order.id,
				quantity: shopItem.quantity,
				price: shopItem.price,
				createdAt: new Date().toString()
			};
			shoppingCartItems.push(
				await shoppingCartItemRepo.create(shopCartItem, { transaction: shoppingCartItemTx })
			);
		}
		await shoppingCartItemTx.commit();
		return {
			order,
			shoppingCart,
			shoppingCartItems,
			customer
		};
		/*} catch (error) {
			await customerTx.rollback();
			await orderTx.rollback();
			await shoppingCartTx.rollback();
			await shoppingCartItemTx.rollback();
		}*/
	}
}
