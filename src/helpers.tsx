import { h } from "@stencil/core";

export const Hero = (name) => (
  <midwest-layout class="hero z-1" padding="small">
    <h2 class="text-base-10 dm:text-white b text-5xl parco">
      <midwest-animate-text>{name}</midwest-animate-text>
    </h2>
  </midwest-layout>
);
