import { newE2EPage } from "@stencil/core/testing";

describe("barcamp-schedule-reassign-talk", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<barcamp-schedule-reassign-talk></barcamp-schedule-reassign-talk>"
    );

    const element = await page.find("barcamp-schedule-reassign-talk");
    expect(element).toHaveClass("hydrated");
  });
});
