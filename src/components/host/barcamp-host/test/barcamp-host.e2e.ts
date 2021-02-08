import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-host', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-host></barcamp-host>');

    const element = await page.find('barcamp-host');
    expect(element).toHaveClass('hydrated');
  });
});
