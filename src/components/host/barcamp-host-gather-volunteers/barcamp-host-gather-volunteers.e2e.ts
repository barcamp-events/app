import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-gather-volunteers', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-gather-volunteers></barcamp-host-gather-volunteers>');

    const element = await page.find('barcamp-host-gather-volunteers');
    expect(element).toHaveClass('hydrated');
  });
});
