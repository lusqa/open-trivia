import axios from "axios";

export default {
  getCategories: async function() {
    const result = await axios.get("https://opentdb.com/api_category.php");
    return result.data.trivia_categories;
  },
  getQuestions: async function(category) {
    const result = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
    );
    return result.data.results;
  }
};
