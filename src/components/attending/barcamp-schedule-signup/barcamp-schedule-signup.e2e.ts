import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule-signup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule-signup></barcamp-schedule-signup>');

    const element = await page.find('barcamp-schedule-signup');
    expect(element).toHaveClass('hydrated');
  });
});
