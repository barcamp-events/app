import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-name-your-event', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-name-your-event></barcamp-host-name-your-event>');

    const element = await page.find('barcamp-host-name-your-event');
    expect(element).toHaveClass('hydrated');
  });
});
