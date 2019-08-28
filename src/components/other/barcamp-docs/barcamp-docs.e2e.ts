import { newE2EPage } from '@stencil/core/testing';

describe('barcamp-docs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcamp-docs></barcamp-docs>');

    const element = await page.find('barcamp-docs');
    expect(element).toHaveClass('hydrated');
  });
});
