import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-track', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-track></barcamp-schedule-track>');

    const element = await page.find('barcamp-schedule-track');
    expect(element).toHaveClass('hydrated');
  });
});
