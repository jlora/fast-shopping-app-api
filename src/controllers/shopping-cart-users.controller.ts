import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ShoppingCart,
  Users,
} from '../models';
import {ShoppingCartRepository} from '../repositories';

export class ShoppingCartUsersController {
  constructor(
    @repository(ShoppingCartRepository)
    public shoppingCartRepository: ShoppingCartRepository,
  ) { }

  @get('/shopping-carts/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to ShoppingCart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof ShoppingCart.prototype.id,
  ): Promise<Users> {
    return this.shoppingCartRepository.users(id);
  }
}
