import { AnyObject, Count, CountSchema, Filter, FilterExcludingWhere, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody } from '@loopback/rest';
import { Orders } from '../models';
import { OrdersRepository } from '../repositories';

export class OrdersController {
	constructor(@repository(OrdersRepository) public ordersRepository: OrdersRepository) {}

	@post('/orders', {
		responses: {
			'200': {
				description: 'Orders model instance',
				content: { 'application/json': { schema: getModelSchemaRef(Orders) } }
			}
		}
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Orders, {
						title: 'NewOrders'
					})
				}
			}
		})
		orders: Orders
	): Promise<Orders> {
		return this.ordersRepository.create(orders);
	}

	@get('/orders/count', {
		responses: {
			'200': {
				description: 'Orders model count',
				content: { 'application/json': { schema: CountSchema } }
			}
		}
	})
	async count(@param.where(Orders) where?: Where<Orders>): Promise<Count> {
		return this.ordersRepository.count(where);
	}

	@get('/orders', {
		responses: {
			'200': {
				description: 'Array of Orders model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Orders, { includeRelations: true })
						}
					}
				}
			}
		}
	})
	async find(@param.filter(Orders) filter?: Filter<Orders>): Promise<Orders[]> {
		return this.ordersRepository.find(filter);
	}

	@patch('/orders', {
		responses: {
			'200': {
				description: 'Orders PATCH success count',
				content: { 'application/json': { schema: CountSchema } }
			}
		}
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Orders, { partial: true })
				}
			}
		})
		orders: Orders,
		@param.where(Orders) where?: Where<Orders>
	): Promise<Count> {
		return this.ordersRepository.updateAll(orders, where);
	}

	@get('/orders/{id}', {
		responses: {
			'200': {
				description: 'Orders model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Orders, { includeRelations: true })
					}
				}
			}
		}
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(Orders, { exclude: 'where' })
		filter?: FilterExcludingWhere<Orders>
	): Promise<Orders> {
		return this.ordersRepository.findById(id, filter);
	}

	@patch('/orders/{id}', {
		responses: {
			'204': {
				description: 'Orders PATCH success'
			}
		}
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Orders, { partial: true })
				}
			}
		})
		orders: Orders
	): Promise<void> {
		await this.ordersRepository.updateById(id, orders);
	}

	@put('/orders/{id}', {
		responses: {
			'204': {
				description: 'Orders PUT success'
			}
		}
	})
	async replaceById(@param.path.number('id') id: number, @requestBody() orders: Orders): Promise<void> {
		await this.ordersRepository.replaceById(id, orders);
	}

	@del('/orders/{id}', {
		responses: {
			'204': {
				description: 'Orders DELETE success'
			}
		}
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.ordersRepository.deleteById(id);
	}

	@post('/order-confirmed', {
		responses: {
			'200': {
				description: 'Create order confirmed',
				content: {
					'application/json': {
						returns: {
							type: 'object',
							root: true
						}
					}
				}
			}
		}
	})
	async createOrderConfirmed(
		@requestBody({
			content: {
				'application/json': {
					accepts: {
						arg: 'data',
						type: 'object',
						http: {
							source: 'body'
						}
					}
				}
			}
		})
		createOrderConfirmedObj: AnyObject
	): Promise<AnyObject> {
		return this.ordersRepository.createOrderConfirmed(createOrderConfirmedObj);
	}
}
