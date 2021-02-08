import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host-event-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host-event-preview></barcamp-host-event-preview>');

    const element = await page.find('barcamp-host-event-preview');
    expect(element).toHaveClass('hydrated');
  });
});
