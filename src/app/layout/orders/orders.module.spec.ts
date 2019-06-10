import { OrdersModule } from './orders.module';

describe('ShopsModule', () => {
  let shopsModule: OrdersModule;

  beforeEach(() => {
    shopsModule = new OrdersModule();
  });

  it('should create an instance', () => {
    expect(shopsModule).toBeTruthy();
  });
});
