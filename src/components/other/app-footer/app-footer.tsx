import { Component, Host, h } from "@stencil/core";
import { href } from "stencil-router-v2";

@Component({
  tag: "app-footer",
  styleUrl: "app-footer.css",
})
export class AppFooter {
  render() {
    return (
      <Host class="bg-white dm:bg-black">
        <midwest-layout size="full" class="w-full center" padding="small">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center">
              <midwest-button
                tag="link"
                {...href("/docs/privacy-policy")}
                ghost
              >
                Privacy Policy
              </midwest-button>
              <span class="mx-4 block">|</span>
              <midwest-button
                tag="link"
                {...href("/docs/terms-of-service")}
                ghost
              >
                Terms of Service
              </midwest-button>
              <span class="mx-4 block">|</span>
              <midwest-button
                tag="link"
                {...href("/docs/code-of-conduct")}
                ghost
              >
                Code of Conduct
              </midwest-button>
            </div>

            <div>
              <midwest-button
                tag="link"
                ghost
                iconOnly
                class="mr-4"
                target="_blank"
                href="https://facebook.com/barcampevents"
              >
                <ion-icon name="logo-facebook" class="text-4xl" slot="icon" />
              </midwest-button>
              <midwest-button
                tag="link"
                ghost
                iconOnly
                class="mr-4"
                target="_blank"
                href="https://twitter.com/barcampevents"
              >
                <ion-icon name="logo-twitter" class="text-4xl" slot="icon" />
              </midwest-button>
              <midwest-button
                tag="link"
                ghost
                iconOnly
                target="_blank"
                href="https://instagram.com/barcampevents"
              >
                <ion-icon name="logo-instagram" class="text-4xl" slot="icon" />
              </midwest-button>
            </div>
          </div>
        </midwest-layout>
      </Host>
    );
  }
}
