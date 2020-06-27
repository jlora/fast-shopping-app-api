import { Count, CountSchema, Filter, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody } from '@loopback/rest';
import { ShoppingCart, Users } from '../models';
import { UsersRepository } from '../repositories';

export class UsersShoppingCartController {
	constructor(@repository(UsersRepository) protected usersRepository: UsersRepository) {}

	@get('/users/{id}/shopping-carts', {
		responses: {
			'200': {
				description: 'Array of Users has many ShoppingCart',
				content: {
					'application/json': {
						schema: { type: 'array', items: getModelSchemaRef(ShoppingCart) }
					}
				}
			}
		}
	})
	async find(
		@param.path.string('id') id: string,
		@param.query.object('filter') filter?: Filter<ShoppingCart>
	): Promise<ShoppingCart[]> {
		return this.usersRepository.shoppingCarts(id).find(filter);
	}

	@post('/users/{id}/shopping-carts', {
		responses: {
			'200': {
				description: 'Users model instance',
				content: { 'application/json': { schema: getModelSchemaRef(ShoppingCart) } }
			}
		}
	})
	async create(
		@param.path.string('id') id: typeof Users.prototype.id,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(ShoppingCart, {
						title: 'NewShoppingCartInUsers',
						exclude: [ 'id' ],
						optional: [ 'userId' ]
					})
				}
			}
		})
		shoppingCart: Omit<ShoppingCart, 'id'>
	): Promise<ShoppingCart> {
		return this.usersRepository.shoppingCarts(id).create(shoppingCart);
	}

	@patch('/users/{id}/shopping-carts', {
		responses: {
			'200': {
				description: 'Users.ShoppingCart PATCH success count',
				content: { 'application/json': { schema: CountSchema } }
			}
		}
	})
	async patch(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(ShoppingCart, { partial: true })
				}
			}
		})
		shoppingCart: Partial<ShoppingCart>,
		@param.query.object('where', getWhereSchemaFor(ShoppingCart))
		where?: Where<ShoppingCart>
	): Promise<Count> {
		return this.usersRepository.shoppingCarts(id).patch(shoppingCart, where);
	}

	@del('/users/{id}/shopping-carts', {
		responses: {
			'200': {
				description: 'Users.ShoppingCart DELETE success count',
				content: { 'application/json': { schema: CountSchema } }
			}
		}
	})
	async delete(
		@param.path.string('id') id: string,
		@param.query.object('where', getWhereSchemaFor(ShoppingCart))
		where?: Where<ShoppingCart>
	): Promise<Count> {
		return this.usersRepository.shoppingCarts(id).delete(where);
	}
}
