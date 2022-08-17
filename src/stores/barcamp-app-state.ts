import { createStore } from "@stencil/store";

export interface BarcampAppState {
  user: User;
  conference: Conference;
  writable: boolean;
}

const initialState: BarcampAppState = {
  user: undefined,
  conference: undefined,
  writable: localStorage.getItem("writable") === "true",
};

const store = createStore(initialState);

store.onChange("writable", (val) => {
  localStorage.setItem("writable", val ? "true" : "false");
});

export default store;
