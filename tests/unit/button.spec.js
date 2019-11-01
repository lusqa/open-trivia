import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  const id = "button";
  const label = "Button Test";
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Button, {
      propsData: {
        id,
        label,
        disabled: false
      }
    });
  });

  it("When the button is enabled should render the information properly", () => {
    expect(wrapper.find(`#${id}`).classes("button--disabled")).to.equal(false);
    expect(wrapper.find(`#${id}Label`).text()).to.include(label);
  });

  it("When the button is disabled should have the disabled class", () => {
    wrapper.setProps({
      disabled: true
    });
    expect(wrapper.find(`#${id}`).classes("button--disabled")).to.equal(true);
    expect(wrapper.find(`#${id}Label`).text()).to.include(label);
  });
});
