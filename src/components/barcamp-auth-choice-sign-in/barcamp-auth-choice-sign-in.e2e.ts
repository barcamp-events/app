import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-auth-choice-sign-in', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-auth-choice-sign-in></barcamp-auth-choice-sign-in>');

    const element = await page.find('barcamp-auth-choice-sign-in');
    expect(element).toHaveClass('hydrated');
  });
});
