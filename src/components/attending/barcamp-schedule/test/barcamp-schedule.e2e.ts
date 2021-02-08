import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-schedule', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-schedule></barcamp-schedule>');

    const element = await page.find('barcamp-schedule');
    expect(element).toHaveClass('hydrated');
  });
});
