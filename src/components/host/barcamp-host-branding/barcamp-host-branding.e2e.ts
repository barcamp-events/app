import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-branding', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-branding></barcamp-host-branding>');

    const element = await page.find('barcamp-host-branding');
    expect(element).toHaveClass('hydrated');
  });
});
