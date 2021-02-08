import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-dashboard></barcamp-dashboard>');

    const element = await page.find('barcamp-dashboard');
    expect(element).toHaveClass('hydrated');
  });
});
