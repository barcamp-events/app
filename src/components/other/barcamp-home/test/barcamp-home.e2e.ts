import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-home></barcamp-home>');

    const element = await page.find('barcamp-home');
    expect(element).toHaveClass('hydrated');
  });
});
