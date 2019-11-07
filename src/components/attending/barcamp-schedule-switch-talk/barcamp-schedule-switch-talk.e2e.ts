import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-switch-talk', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-switch-talk></barcamp-schedule-switch-talk>');

    const element = await page.find('barcamp-schedule-switch-talk');
    expect(element).toHaveClass('hydrated');
  });
});
