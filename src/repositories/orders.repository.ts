import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Orders, OrdersRelations, Users, ShoppingCartItems, Customers, ShoppingCart} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';
import {ShoppingCartItemsRepository} from './shopping-cart-items.repository';
import {CustomersRepository} from './customers.repository';
import {ShoppingCartRepository} from './shopping-cart.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {

  public readonly user: BelongsToAccessor<Users, typeof Orders.prototype.id>;

  public readonly shoppingCartItems: HasManyRepositoryFactory<ShoppingCartItems, typeof Orders.prototype.id>;

  public readonly customer: BelongsToAccessor<Customers, typeof Orders.prototype.id>;

  public readonly shoppingCart: HasOneRepositoryFactory<ShoppingCart, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ShoppingCartItemsRepository') protected shoppingCartItemsRepositoryGetter: Getter<ShoppingCartItemsRepository>, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('ShoppingCartRepository') protected shoppingCartRepositoryGetter: Getter<ShoppingCartRepository>,
  ) {
    super(Orders, dataSource);
    this.shoppingCart = this.createHasOneRepositoryFactoryFor('shoppingCart', shoppingCartRepositoryGetter);
    this.registerInclusionResolver('shoppingCart', this.shoppingCart.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customersRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.shoppingCartItems = this.createHasManyRepositoryFactoryFor('shoppingCartItems', shoppingCartItemsRepositoryGetter,);
    this.registerInclusionResolver('shoppingCartItems', this.shoppingCartItems.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
