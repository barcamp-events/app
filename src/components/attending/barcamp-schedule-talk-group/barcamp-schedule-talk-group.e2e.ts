import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-talk-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-talk-group></barcamp-schedule-talk-group>');

    const element = await page.find('barcamp-schedule-talk-group');
    expect(element).toHaveClass('hydrated');
  });
});
