import { Component, Host, Prop, h, State, Watch } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';

@Component({
  tag: 'barcamp-docs',
  styleUrl: 'barcamp-docs.css'
})
export class BarcampDocs {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() name: string;

  componentWillLoad() {
    this.name = this.match.params.name;
  }

  @Watch('match')
  handleNameChange() {
    this.name = this.match.params.name;
  }

  get source() {
    var docs = {
      'terms-of-service': 'https://raw.githubusercontent.com/barcamp-events/documents/master/TERMS_OF_SERVICE.md',
      'code-of-conduct': 'https://raw.githubusercontent.com/barcamp-events/documents/master/CODE_OF_CONDUCT.md',
      'reporting': 'https://raw.githubusercontent.com/barcamp-events/documents/master/REPORTING.md',
      'rules': 'https://raw.githubusercontent.com/barcamp-events/documents/master/RULES.md',
      'privacy-policy': 'https://raw.githubusercontent.com/barcamp-events/documents/master/PRIVACY_POLICY.md'
    };

    return docs[this.name]
  }

  render() {
    return (
      <Host>
        <stellar-layout size="medium" padding="large">
          <copy-wrap>
            {this.name && <stellar-markdown src={this.source} flavor="github" />}
          </copy-wrap>
        </stellar-layout>
      </Host>
    );
  }

}
