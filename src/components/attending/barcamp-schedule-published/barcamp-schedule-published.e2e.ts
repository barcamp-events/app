import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-published', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-published></barcamp-schedule-published>');

    const element = await page.find('barcamp-schedule-published');
    expect(element).toHaveClass('hydrated');
  });
});
