import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-auth-choice-sign-up', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-auth-choice-sign-up></barcamp-auth-choice-sign-up>');

    const element = await page.find('barcamp-auth-choice-sign-up');
    expect(element).toHaveClass('hydrated');
  });
});
