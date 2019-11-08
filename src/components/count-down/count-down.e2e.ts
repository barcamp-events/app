import { newE2EPage } from '@stencil/core/testing';

describe('count-down', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<count-down></count-down>');

    const element = await page.find('count-down');
    expect(element).toHaveClass('hydrated');
  });
});
