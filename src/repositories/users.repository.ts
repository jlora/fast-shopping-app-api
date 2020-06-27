import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, ShoppingCart, Orders} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ShoppingCartRepository} from './shopping-cart.repository';
import {OrdersRepository} from './orders.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly shoppingCarts: HasManyRepositoryFactory<ShoppingCart, typeof Users.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('ShoppingCartRepository') protected shoppingCartRepositoryGetter: Getter<ShoppingCartRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Users, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.shoppingCarts = this.createHasManyRepositoryFactoryFor('shoppingCarts', shoppingCartRepositoryGetter,);
    this.registerInclusionResolver('shoppingCarts', this.shoppingCarts.inclusionResolver);
  }
}
