import { SalesProgramPage } from './app.po';

describe('sales-program App', () => {
  let page: SalesProgramPage;

  beforeEach(() => {
    page = new SalesProgramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
