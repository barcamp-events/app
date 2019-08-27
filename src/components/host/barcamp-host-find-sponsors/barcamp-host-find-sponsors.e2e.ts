import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-find-sponsors', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-find-sponsors></barcamp-host-find-sponsors>');

    const element = await page.find('barcamp-host-find-sponsors');
    expect(element).toHaveClass('hydrated');
  });
});
