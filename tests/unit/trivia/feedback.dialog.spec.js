import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import FeedbackDialog from "@/components/trivia/FeedbackDialog.vue";

describe("FeedbackDialog.vue", () => {
  it("Should render properly the info when passed isCorrect as true", () => {
    const id = "feedbackDialog";
    const isCorrect = true;
    const wrapper = shallowMount(FeedbackDialog, {
      propsData: {
        id,
        isCorrect
      }
    });

    expect(wrapper.contains(".overlay")).to.equal(true);
    expect(wrapper.find(`#${id}Label`).text()).to.include("You got!");
    expect(wrapper.contains(`#${id}Image`)).to.equal(true);
    expect(wrapper.contains(`#${id}NextButton`)).to.equal(true);
  });

  it("Should render properly the info when passed isCorrect as true", () => {
    const id = "feedbackDialog";
    const isCorrect = false;
    const wrapper = shallowMount(FeedbackDialog, {
      propsData: {
        id,
        isCorrect
      }
    });

    expect(wrapper.contains(".overlay")).to.equal(true);
    expect(wrapper.find(`#${id}Label`).text()).to.include("You missed!");
    expect(wrapper.contains(`#${id}Image`)).to.equal(true);
    expect(wrapper.contains(`#${id}NextButton`)).to.equal(true);
  });
});
