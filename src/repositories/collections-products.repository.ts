import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CollectionsProducts, CollectionsProductsRelations, Products, Collections} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductsRepository} from './products.repository';
import {CollectionsRepository} from './collections.repository';

export class CollectionsProductsRepository extends DefaultCrudRepository<
  CollectionsProducts,
  typeof CollectionsProducts.prototype.id,
  CollectionsProductsRelations
> {

  public readonly product: BelongsToAccessor<Products, typeof CollectionsProducts.prototype.id>;

  public readonly collection: BelongsToAccessor<Collections, typeof CollectionsProducts.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('CollectionsRepository') protected collectionsRepositoryGetter: Getter<CollectionsRepository>,
  ) {
    super(CollectionsProducts, dataSource);
    this.collection = this.createBelongsToAccessorFor('collection', collectionsRepositoryGetter,);
    this.registerInclusionResolver('collection', this.collection.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productsRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
