import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Card from "@/components/home/Card.vue";

describe.only("Card.vue", () => {
  const id = "card";
  const label = "Card Test";
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      propsData: {
        id,
        label
      }
    });
  });

  it("renders props.label when passed", () => {
    expect(wrapper.find(`#${id}Label`).text()).to.include(label);
    expect(wrapper.contains(`#${id}`)).to.equal(true);
  });

  it("emits a click event when clicked", () => {
    wrapper.find(`#${id}`).trigger("click", {
      button: 0
    });
    expect(!!wrapper.emitted().click).to.equal(true);
  });
});
