import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-set-format', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-set-format></barcamp-host-set-format>');

    const element = await page.find('barcamp-host-set-format');
    expect(element).toHaveClass('hydrated');
  });
});
