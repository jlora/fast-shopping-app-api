import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Collections, CollectionsRelations, CollectionsProducts} from '../models';
import {ShoppingDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CollectionsProductsRepository} from './collections-products.repository';

export class CollectionsRepository extends DefaultCrudRepository<
  Collections,
  typeof Collections.prototype.id,
  CollectionsRelations
> {

  public readonly collectionsProducts: HasManyRepositoryFactory<CollectionsProducts, typeof Collections.prototype.id>;

  constructor(
    @inject('datasources.shopping') dataSource: ShoppingDataSource, @repository.getter('CollectionsProductsRepository') protected collectionsProductsRepositoryGetter: Getter<CollectionsProductsRepository>,
  ) {
    super(Collections, dataSource);
    this.collectionsProducts = this.createHasManyRepositoryFactoryFor('collectionsProducts', collectionsProductsRepositoryGetter,);
    this.registerInclusionResolver('collectionsProducts', this.collectionsProducts.inclusionResolver);
  }
}
