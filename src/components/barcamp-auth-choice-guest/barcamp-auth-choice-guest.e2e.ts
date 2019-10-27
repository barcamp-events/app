import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-auth-choice-guest', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-auth-choice-guest></barcamp-auth-choice-guest>');

    const element = await page.find('barcamp-auth-choice-guest');
    expect(element).toHaveClass('hydrated');
  });
});
