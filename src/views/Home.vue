<template>
  <div class="home">
    <FeedbackDialog id="feedbackDialog" status="correct" />
  </div>
</template>

<script>
import FeedbackDialog from "@/components/FeedbackDialog";
export default {
  name: "Home",
  components: {
    FeedbackDialog
  }
};
</script>
