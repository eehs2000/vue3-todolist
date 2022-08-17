<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div
      class="card-body p-2 d-flex align-items-center"
      @click="moveToDetail(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(index)"
          @click.stop
        />
        <label
          class="form-check-label"
          :style="todo.completed ? onCheckStyle : {}"
          >{{ todo.subject }}</label
        >
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
    onCheckStyle: {},
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    const moveToDetail = (todoId) => {
      // router.push("/todos/" + todoId);
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };
    return {
      toggleTodo,
      deleteTodo,
      moveToDetail,
    };
  },
};
</script>

<style></style>
