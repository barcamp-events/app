import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-talk-signing-up', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-talk-signing-up></barcamp-schedule-talk-signing-up>');

    const element = await page.find('barcamp-schedule-talk-signing-up');
    expect(element).toHaveClass('hydrated');
  });
});
