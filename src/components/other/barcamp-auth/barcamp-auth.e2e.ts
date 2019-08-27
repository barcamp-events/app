import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-auth', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-auth></barcamp-auth>');

    const element = await page.find('barcamp-auth');
    expect(element).toHaveClass('hydrated');
  });
});
