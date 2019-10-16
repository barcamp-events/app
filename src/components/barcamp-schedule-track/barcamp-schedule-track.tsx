import { Component, Host, h, Prop, State } from '@stencil/core';
import Track from '../../models/Track';
import Talk from '../../models/Talk';

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
    return this.talks && <Host style={{"min-width": "300px"}}>
      <stellar-grid cols="1" noresponsive>
        {this.talks.map(talk => <div>
          <p class="b fw6">{talk.time.format("H:mm")}</p>
          <barcamp-schedule-talk talk={talk} />
        </div>)}
      </stellar-grid>
    </Host>
  }

}
