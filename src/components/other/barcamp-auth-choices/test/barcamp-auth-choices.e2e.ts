import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-auth-choices', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-auth-choices></barcamp-auth-choices>');

    const element = await page.find('barcamp-auth-choices');
    expect(element).toHaveClass('hydrated');
  });
});
