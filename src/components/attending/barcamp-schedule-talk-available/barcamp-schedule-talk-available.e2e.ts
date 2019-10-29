import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-talk-available', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-talk-available></barcamp-schedule-talk-available>');

    const element = await page.find('barcamp-schedule-talk-available');
    expect(element).toHaveClass('hydrated');
  });
});
