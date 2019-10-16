import triviaService from "@/services/trivia.js";

export default {
  namespaced: true,
  state: {
    questions: []
  },
  getters: {},
  mutations: {
    setQuestions(state, value) {
      state.questions = value;
    }
  },
  actions: {
    async getQuestions({ commit }, category) {
      const categories = await triviaService.getCategories();
      const categoryId = categories.find(c => c.name === category).id;

      const questions = await triviaService.getQuestions(categoryId);

      commit("setQuestions", questions);
    }
  }
};
