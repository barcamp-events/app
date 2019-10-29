import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-sponsor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-sponsor></barcamp-sponsor>');

    const element = await page.find('barcamp-sponsor');
    expect(element).toHaveClass('hydrated');
  });
});
