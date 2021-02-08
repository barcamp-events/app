import { Component, Host, h, Prop } from '@stencil/core';
import Sponsor from '../../../models/Sponsor';

@Component({
  tag: 'barcamp-sponsor'
})
export class BarcampSponsor {
  @Prop() sponsor: Sponsor;

  get showDescription() {
    return ["platinum", "gold"].includes(this.sponsor.level.toLowerCase())
  }

  render() {
    return <Host>
      <a href={this.sponsor.cta} target="_blank" class="db relative" title={`${this.sponsor.name}'s website`}>
        <copy-wrap align="center">
          <img src={this.sponsor.image} loading="lazy" class="ma0" alt={`${this.sponsor.name}'s Logo`} />
          {this.showDescription && <p>{this.sponsor.description}</p>}
          <midwest-tooltip align="bottom-center">{this.sponsor.name}</midwest-tooltip>
        </copy-wrap>
      </a>
    </Host>
  }
}
