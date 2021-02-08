import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-find-venue', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-find-venue></barcamp-host-find-venue>');

    const element = await page.find('barcamp-host-find-venue');
    expect(element).toHaveClass('hydrated');
  });
});
