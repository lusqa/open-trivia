import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import QuestionCard from "@/components/trivia/QuestionCard.vue";

describe("QuestionCard.vue", () => {
  const id = "questionCard";
  const active = false;
  const index = 1;
  const label = "Question Label";
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(QuestionCard, {
      propsData: {
        id,
        active,
        index,
        label
      }
    });
  });
  describe("When the question is not selected", () => {
    it("Should render properly the info", () => {
      expect(wrapper.find(`#${id}Label`).text()).to.include(label);
      expect(wrapper.contains(`#${id}`)).to.equal(true);
    });

    it("And I click in the question, should emit an event", () => {
      wrapper.find(`#${id}`).trigger("click", {
        button: 0
      });
      const [[indexSelected]] = wrapper.emitted()["question-selected"];
      expect(indexSelected).to.equal(index);
    });
  });

  describe("When the question is selected", () => {
    beforeEach(() => {
      wrapper.setProps({
        active: true
      });
    });
    it("Should render properly the info", () => {
      expect(wrapper.find(`#${id}Label`).text()).to.include(label);
      expect(wrapper.contains(`#${id}`)).to.equal(true);
      expect(wrapper.find(`#${id}`).classes("question-card--active")).to.equal(
        true
      );
    });

    it("And I click in the question, should emit an event", () => {
      wrapper.find(`#${id}`).trigger("click", {
        button: 0
      });
      const [[indexSelected]] = wrapper.emitted()["question-selected"];
      expect(indexSelected).to.equal(index);
      expect(wrapper.find(`#${id}`).classes("question-card--active")).to.equal(
        true
      );
    });
  });
});
