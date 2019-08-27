import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-sign-out', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-sign-out></barcamp-sign-out>');

    const element = await page.find('barcamp-sign-out');
    expect(element).toHaveClass('hydrated');
  });
});
