import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Products, ProductsRelations, CollectionsProducts} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CollectionsProductsRepository} from './collections-products.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly collectionsProducts: HasManyRepositoryFactory<CollectionsProducts, typeof Products.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('CollectionsProductsRepository') protected collectionsProductsRepositoryGetter: Getter<CollectionsProductsRepository>,
  ) {
    super(Products, dataSource);
    this.collectionsProducts = this.createHasManyRepositoryFactoryFor('collectionsProducts', collectionsProductsRepositoryGetter,);
    this.registerInclusionResolver('collectionsProducts', this.collectionsProducts.inclusionResolver);
  }
}
