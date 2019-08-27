import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-set-agenda', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-set-agenda></barcamp-host-set-agenda>');

    const element = await page.find('barcamp-host-set-agenda');
    expect(element).toHaveClass('hydrated');
  });
});
