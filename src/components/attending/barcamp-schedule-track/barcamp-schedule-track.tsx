import { Component, Host, h, Prop, State } from '@stencil/core';
import Track from '../../../models/Track';
import Talk from '../../../models/Talk';

@Component({
  tag: 'barcamp-schedule-track'
})
export class BarcampScheduleTrack {
  @Prop() track: Track;
  @State() talks: Talk[];

  async componentWillLoad() {
    this.talks = await this.track.theTalks()
  }

  render() {
    return this.talks && <Host class="dc" style={{"min-width": "300px"}}>
      {this.talks.map(talk => <div>
        <p class="b fw6">{talk.time.format("hh:mm")}</p>
        <barcamp-schedule-talk talk={talk} />
      </div>)}
    </Host>
  }

}
