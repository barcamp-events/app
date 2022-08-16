import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "barcamp-docs",
  styleUrl: "barcamp-docs.css",
})
export class BarcampDocs {
  @Prop({ mutable: true }) name: string;

  get source() {
    var docs = {
      "terms-of-service":
        "https://raw.githubusercontent.com/barcamp-events/documents/master/TERMS_OF_SERVICE.md",
      "code-of-conduct":
        "https://raw.githubusercontent.com/barcamp-events/documents/master/CODE_OF_CONDUCT.md",
      reporting:
        "https://raw.githubusercontent.com/barcamp-events/documents/master/REPORTING.md",
      rules:
        "https://raw.githubusercontent.com/barcamp-events/documents/master/RULES.md",
      "privacy-policy":
        "https://raw.githubusercontent.com/barcamp-events/documents/master/PRIVACY_POLICY.md",
    };

    return docs[this.name];
  }

  render() {
    return (
      <Host>
        <midwest-layout size="medium" padding="large">
          <copy-wrap>
            {this.name && (
              <midwest-markdown src={this.source} flavor="github" />
            )}
          </copy-wrap>
        </midwest-layout>
      </Host>
    );
  }
}
