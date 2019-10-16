import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-talk', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-talk></barcamp-schedule-talk>');

    const element = await page.find('barcamp-schedule-talk');
    expect(element).toHaveClass('hydrated');
  });
});
