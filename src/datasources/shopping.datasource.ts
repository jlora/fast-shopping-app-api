import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'shopping',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 33060,
  user: 'root',
  password: 'secret',
  database: 'shopping'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ShoppingDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'shopping';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.shopping', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
