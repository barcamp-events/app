import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';
import User from '../models/User';

export interface State {
  user: User,
}

export default createProviderConsumer<State>({
    user: undefined,
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
