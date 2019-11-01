import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import FeedbackDialog from "@/components/trivia/FeedbackDialog.vue";

describe("FeedbackDialog.vue", () => {
  const id = "feedbackDialog";
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FeedbackDialog, {
      propsData: {
        id,
        isCorrect: true
      }
    });
  });
  it("Should render properly the info when passed isCorrect as true", () => {
    expect(wrapper.contains(".overlay")).to.equal(true);
    expect(wrapper.find(`#${id}Label`).text()).to.include("You got!");
    expect(wrapper.contains(`#${id}Image`)).to.equal(true);
    expect(wrapper.contains(`#${id}NextButton`)).to.equal(true);
  });

  it("Should render properly the info when passed isCorrect as true", () => {
    wrapper.setProps({
      isCorrect: false
    });

    expect(wrapper.contains(".overlay")).to.equal(true);
    expect(wrapper.find(`#${id}Label`).text()).to.include("You missed!");
    expect(wrapper.contains(`#${id}Image`)).to.equal(true);
    expect(wrapper.contains(`#${id}NextButton`)).to.equal(true);
  });
});
