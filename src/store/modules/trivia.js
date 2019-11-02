import triviaService from "@/services/trivia.js";

export default {
  namespaced: true,
  state: {
    categories: [],
    questions: {
      easy: [],
      medium: [],
      hard: []
    }
  },
  getters: {},
  mutations: {
    setCategories(state, value) {
      state.categories.splice(0, state.categories.length, ...value);
    },
    setQuestions(state, value) {
      state.questions = { ...state.questions, ...value };
    },
    resetQuestions(state) {
      state.questions = {
        easy: [],
        medium: [],
        hard: []
      };
    }
  },
  actions: {
    async getCategories({ state, commit }) {
      if (!state.categories.length) {
        const selectedCategories = [
          "History",
          "Mythology",
          "Sports",
          "Politics",
          "General Knowledge",
          "Geography"
        ];
        const categories = await triviaService.getCategories();
        const filteredCategories = categories.filter(category =>
          selectedCategories.includes(category.name)
        );
        commit("setCategories", filteredCategories);
      }
    },
    async getQuestions({ state, commit, dispatch }, category) {
      await dispatch("getCategories");
      const categoryId = state.categories.find(c => c.name === category).id;
      const promises = [
        triviaService.getQuestions(categoryId, "easy"),
        triviaService.getQuestions(categoryId, "medium"),
        triviaService.getQuestions(categoryId, "hard")
      ];

      const [easy, medium, hard] = await Promise.all(promises);
      commit("setQuestions", { easy, medium, hard });
    }
  }
};
