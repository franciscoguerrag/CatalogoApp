import { ProductsModule } from './products.module';

describe('ShopsModule', () => {
  let shopsModule: ProductsModule;

  beforeEach(() => {
    shopsModule = new ProductsModule();
  });

  it('should create an instance', () => {
    expect(shopsModule).toBeTruthy();
  });
});
