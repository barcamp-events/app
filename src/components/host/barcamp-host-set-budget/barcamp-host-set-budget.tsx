import { Component, Host, h, State } from '@stencil/core';
import ConferenceTunnel from '../../../tunnels/conference';
import { asyncForEach } from '@midwest-design/common';
import LineItem from '../../../models/LineItem';
import { LineItemList } from '../../../models/LineItemList';
import delay from "async-delay";

@Component({
  tag: 'barcamp-host-set-budget'
})
export class BarcampHostSetBudget {

  @State() conference: Conference;
  @State() lineItems: LineItemList;

  async componentWillLoad() {
    this.lineItems = await this.conference.theLineItems();
  }

  async createLineItems (e) {
    const lineItems = Object.entries(e.detail.json.lineItems);

    let missingItems = this.conference.lineItems.filter(x => !lineItems.map(li => (li[1] as any).key).includes(x));

    await asyncForEach(missingItems, async (key) => {
      const result = await LineItem.delete(key);
      console.log(result);
    })

    this.conference.lineItems = [];

    await asyncForEach(lineItems, async (item) => {
      let itemObject: LineItem;
      item[1].cost = item[1].cost.replace("$", "")
      item[1].raised = item[1].raised.replace("$", "")

      if (item[1].key) {
        itemObject = await LineItem.get(item[1].key)
        itemObject.populate(item[1])
        await itemObject.save()
      } else {
        itemObject = await LineItem.create({...item[1], conferenceKey: this.conference.key })
      }

      this.conference.lineItems = [...new Set([...this.conference.lineItems, itemObject.key])];

      await this.conference.save();
    })

    this.lineItems = await this.conference.theLineItems();

    await delay(1000);

    this.conference.step = "venue";
    this.conference.save();
  }

  render() {
    return (
      <Host>
        <midwest-layout
          type="supporting-content"
          class="align-start"
          size="large"
        >
          <section>
            <midwest-card>
              <header>
                <h3 class="parco italic dm:text-white">Set Your Budget</h3>
              </header>
              <section>
                <midwest-form
                  ajax
                  onSubmitted={this.createLineItems.bind(this)}
                >
                  <midwest-grid cols="1" responsive={false}>
                    <midwest-repeatable-fields
                      data={JSON.stringify(this.lineItems.list)}
                      addOneIfEmpty
                      verbiage="Line Item"
                    >
                      <template
                        innerHTML={`
                      <midwest-grid class="border border-gray-1 dm:border-gray-11 bg-gray-0 dm:bg-gray-10 rounded p-4 relative" column-width="100" column-gap="1">
                        <midwest-input type="hidden" name="lineItems[{index}][key]"></midwest-input>
                        <midwest-input type="hidden" name="lineItems[{index}][owner]"></midwest-input>
                        <midwest-input type="hidden" name="lineItems[{index}][conferenceKey]"></midwest-input>
                        <midwest-input name="lineItems[{index}][name]" placeholder="Line Item"></midwest-input>
                        <midwest-input name="lineItems[{index}][description]" placeholder="Description"></midwest-input>
                        <midwest-input type="currency" autoformat name="lineItems[{index}][cost]" placeholder="Cost"></midwest-input>
                        <midwest-input type="currency" autoformat name="lineItems[{index}][raised]" placeholder="Raised"></midwest-input>
                        <midwest-button tag="button" for="delete-entry" icon-only ghost class="-mr-4 -mt-20 absolute bg-white dm:bg-gray-10 right-0 rounded-full too-0"><ion-icon name="trash" slot="icon"></ion-icon></midwest-button>
                      </midwest-grid>
                    `}
                      />
                    </midwest-repeatable-fields>
                    <midwest-button tag="submit" class="inline-block">
                      Save and Continue
                    </midwest-button>
                  </midwest-grid>
                </midwest-form>
              </section>
            </midwest-card>
          </section>
          <aside class="sticky top-0 bottom-0 m-auto mt-0">
            <barcamp-host-event-preview
              conference={this.conference}
              lineItems={this.lineItems}
              showBudget
            />
          </aside>
        </midwest-layout>
      </Host>
    );
  }

}
ConferenceTunnel.injectProps(BarcampHostSetBudget, ["conference"])