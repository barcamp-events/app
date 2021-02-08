import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-default-marketing', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-default-marketing></barcamp-default-marketing>');

    const element = await page.find('barcamp-default-marketing');
    expect(element).toHaveClass('hydrated');
  });
});
