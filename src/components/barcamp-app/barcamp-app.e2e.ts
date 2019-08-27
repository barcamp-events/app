import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-app></barcamp-app>');

    const element = await page.find('barcamp-app');
    expect(element).toHaveClass('hydrated');
  });
});
