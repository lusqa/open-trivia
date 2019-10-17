import triviaService from "@/services/trivia.js";

export default {
  namespaced: true,
  state: {
    categories: [],
    questions: []
  },
  getters: {},
  mutations: {
    setCategories(state, value) {
      const { categories } = state;
      state.categories.splice(0, categories, ...value);
    },
    setQuestions(state, value) {
      const { questions } = state;
      state.questions.splice(0, questions, ...value);
    }
  },
  actions: {
    async getCategories({ commit }) {
      const categories = await triviaService.getCategories();
      commit("setCategories", categories);
    },
    async getQuestions({ state, commit }, category) {
      const categoryId = state.categories.find(c => c.name === category).id;
      const questions = await triviaService.getQuestions(categoryId);

      commit("setQuestions", questions);
    }
  }
};
