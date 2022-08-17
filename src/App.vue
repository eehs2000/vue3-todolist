<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      v-model="searchText"
      type="text"
      placeholder="search"
    />
    <hr />
    <TodoForm @add-todo="addTodo" />
    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "axios";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);

    const onCheckStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        todos.value = res.data;
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      try {
        const res = await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
      }
      // .then((res) => {
      //   todos.value.push(res.data);
      //   console.log(res);
      // })
      // .catch((err) => console.log(err));
    };

    const deleteTodo = async (index) => {
      const id = todos.value[index].id;
      try {
        const res = await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const searchText = ref("");

    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    return {
      todos,
      onCheckStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      getTodos,
    };
  },
};
</script>

<style></style>
