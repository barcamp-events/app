import { newSpecPage } from '@stencil/core/testing';
import { BarcampHostEventPreview } from '../barcamp-host-event-preview';

describe('barcamp-host-event-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BarcampHostEventPreview],
      html: `<barcamp-host-event-preview></barcamp-host-event-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <barcamp-host-event-preview>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </barcamp-host-event-preview>
    `);
  });
});
