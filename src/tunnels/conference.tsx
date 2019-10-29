import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import Conference from '../models/Conference';

export interface State {
  conference: Conference,
}

export default createProviderConsumer<State>({
    conference: undefined,
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
