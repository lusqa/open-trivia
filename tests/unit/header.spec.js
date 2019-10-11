import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("renders props.label when passed", () => {
    const label = "new label";
    const wrapper = shallowMount(Header, {
      propsData: { label }
    });
    expect(wrapper.text()).to.include(label);
  });
});
