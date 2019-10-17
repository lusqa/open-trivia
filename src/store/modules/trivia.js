import triviaService from "@/services/trivia.js";

export default {
  namespaced: true,
  state: {
    categories: [],
    questions: {
      0: [],
      1: [],
      2: []
    }
  },
  getters: {},
  mutations: {
    setCategories(state, value) {
      const { categories } = state;
      state.categories.splice(0, categories, ...value);
    },
    setQuestions(state, value) {
      state.questions = {
        ...state.questions,
        ...value
      };
    }
  },
  actions: {
    async getCategories({ commit }) {
      const categories = await triviaService.getCategories();
      commit("setCategories", categories);
    },
    async getQuestions({ state, commit, dispatch }, { category, difficulty }) {
      if (!state.categories.length) {
        await dispatch("getCategories");
      }

      const categoryId = state.categories.find(c => c.name === category).id;
      const response = await triviaService.getQuestions(categoryId, difficulty);

      const questions = {
        0: [],
        1: [],
        2: []
      };

      response.forEach(question => {
        if (difficulty === "easy") {
          questions["0"].push(question);
        } else if (difficulty === "medium") {
          questions["1"].push(question);
        } else {
          questions["2"].push(question);
        }
      });

      commit("setQuestions", questions);
    }
  }
};
