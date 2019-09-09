import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-event-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-event-card></barcamp-event-card>');

    const element = await page.find('barcamp-event-card');
    expect(element).toHaveClass('hydrated');
  });
});
