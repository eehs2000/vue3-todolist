<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1">
          <input
            class="form-control"
            v-model="todo"
            type="text"
            placeholder="type new to do"
          />
        </div>
        <div>
          <button class="btn btn-primary mx-1" type="submit">add</button>
        </div>
      </div>
      <div v-show="hasError">Error</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["add-todo"],
  setup(props, context) {
    const todo = ref("");

    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        hasError.value = false;
        context.emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        todo.value = "";
      }
    };

    return {
      todo,
      onSubmit,
      hasError,
    };
  },
};
</script>

<style></style>
