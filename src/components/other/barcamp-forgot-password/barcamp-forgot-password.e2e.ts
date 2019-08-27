import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-forgot-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-forgot-password></barcamp-forgot-password>');

    const element = await page.find('barcamp-forgot-password');
    expect(element).toHaveClass('hydrated');
  });
});
