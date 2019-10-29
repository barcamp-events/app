import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-talk-signed-up', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-talk-signed-up></barcamp-schedule-talk-signed-up>');

    const element = await page.find('barcamp-schedule-talk-signed-up');
    expect(element).toHaveClass('hydrated');
  });
});
