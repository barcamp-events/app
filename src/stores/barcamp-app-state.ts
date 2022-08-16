import { createStore } from "@stencil/store";

export interface BarcampAppState {
  user: User;
  conference: Conference;
  writable: boolean;
}

const initialState: BarcampAppState = {
  user: undefined,
  conference: undefined,
  writable: undefined,
};

const store = createStore(initialState);

export default store;
