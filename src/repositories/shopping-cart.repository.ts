import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ShoppingCart, ShoppingCartRelations, Users, Customers} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';
import {CustomersRepository} from './customers.repository';

export class ShoppingCartRepository extends DefaultCrudRepository<
  ShoppingCart,
  typeof ShoppingCart.prototype.id,
  ShoppingCartRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof ShoppingCart.prototype.id>;

  public readonly customer: BelongsToAccessor<Customers, typeof ShoppingCart.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(ShoppingCart, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customersRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
