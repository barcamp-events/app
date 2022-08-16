import { newE2EPage } from "@stencil/core/testing";

describe("barcamp-schedule-release", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<barcamp-schedule-release></barcamp-schedule-release>"
    );

    const element = await page.find("barcamp-schedule-release");
    expect(element).toHaveClass("hydrated");
  });
});
