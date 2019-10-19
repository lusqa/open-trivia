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
      state.categories.splice(0, categories.length, ...value);
    },
    setQuestions(state, value) {
      const { questions } = state;
      const newValue = [...questions, ...value];
      state.questions.splice(0, questions.length, ...newValue);
    },
    resetQuestions(state) {
      const { questions } = state;
      state.questions.splice(0, questions.length);
    }
  },
  actions: {
    async getCategories({ commit }) {
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
    },
    async getQuestions(
      { state, commit, dispatch },
      { category, difficulty, amount }
    ) {
      if (!state.categories.length) {
        await dispatch("getCategories");
      }

      console.log({ difficulty });

      const categoryId = state.categories.find(c => c.name === category).id;
      const questions = await triviaService.getQuestions(
        categoryId,
        difficulty,
        amount
      );

      commit("setQuestions", questions);
    }
  }
};
