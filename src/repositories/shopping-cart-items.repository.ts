import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ShoppingCartItems, ShoppingCartItemsRelations, Orders, Products, ShoppingCart} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';
import {ProductsRepository} from './products.repository';
import {ShoppingCartRepository} from './shopping-cart.repository';

export class ShoppingCartItemsRepository extends DefaultCrudRepository<
  ShoppingCartItems,
  typeof ShoppingCartItems.prototype.id,
  ShoppingCartItemsRelations
> {

  public readonly order: BelongsToAccessor<Orders, typeof ShoppingCartItems.prototype.id>;

  public readonly product: BelongsToAccessor<Products, typeof ShoppingCartItems.prototype.id>;

  public readonly shoppingCart: BelongsToAccessor<ShoppingCart, typeof ShoppingCartItems.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('ShoppingCartRepository') protected shoppingCartRepositoryGetter: Getter<ShoppingCartRepository>,
  ) {
    super(ShoppingCartItems, dataSource);
    this.shoppingCart = this.createBelongsToAccessorFor('shoppingCart', shoppingCartRepositoryGetter,);
    this.registerInclusionResolver('shoppingCart', this.shoppingCart.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productsRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', ordersRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
