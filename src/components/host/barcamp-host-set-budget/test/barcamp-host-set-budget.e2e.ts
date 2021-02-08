import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-set-budget', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-set-budget></barcamp-host-set-budget>');

    const element = await page.find('barcamp-host-set-budget');
    expect(element).toHaveClass('hydrated');
  });
});
