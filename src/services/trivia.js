import axios from "axios";

export default {
  getCategories: async function() {
    const result = await axios.get("https://opentdb.com/api_category.php");
    return result.data.trivia_categories;
  },
  getQuestions: async function(category, difficulty, amount = 10) {
    const result = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`
    );
    return result.data.results;
  }
};
