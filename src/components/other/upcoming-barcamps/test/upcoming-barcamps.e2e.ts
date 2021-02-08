import { newE2EPage } from '@stencil/core/testing';

describe('upcoming-barcamps', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<upcoming-barcamps></upcoming-barcamps>');

    const element = await page.find('upcoming-barcamps');
    expect(element).toHaveClass('hydrated');
  });
});