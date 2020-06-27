import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Orders, OrdersRelations, Users, ShoppingCartItems} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';
import {ShoppingCartItemsRepository} from './shopping-cart-items.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {

  public readonly user: BelongsToAccessor<Users, typeof Orders.prototype.id>;

  public readonly shoppingCartItems: HasManyRepositoryFactory<ShoppingCartItems, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ShoppingCartItemsRepository') protected shoppingCartItemsRepositoryGetter: Getter<ShoppingCartItemsRepository>,
  ) {
    super(Orders, dataSource);
    this.shoppingCartItems = this.createHasManyRepositoryFactoryFor('shoppingCartItems', shoppingCartItemsRepositoryGetter,);
    this.registerInclusionResolver('shoppingCartItems', this.shoppingCartItems.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
