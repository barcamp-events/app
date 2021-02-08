import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-profile', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-profile></barcamp-profile>');

    const element = await page.find('barcamp-profile');
    expect(element).toHaveClass('hydrated');
  });
});
