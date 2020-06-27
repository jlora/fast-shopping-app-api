import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Customers, CustomersRelations, Orders, ShoppingCart} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';
import {ShoppingCartRepository} from './shopping-cart.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Customers.prototype.id>;

  public readonly shoppingCarts: HasManyRepositoryFactory<ShoppingCart, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('ShoppingCartRepository') protected shoppingCartRepositoryGetter: Getter<ShoppingCartRepository>,
  ) {
    super(Customers, dataSource);
    this.shoppingCarts = this.createHasManyRepositoryFactoryFor('shoppingCarts', shoppingCartRepositoryGetter,);
    this.registerInclusionResolver('shoppingCarts', this.shoppingCarts.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
