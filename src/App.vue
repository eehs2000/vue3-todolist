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
      :todos="todos"
      :onCheckStyle="onCheckStyle"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            @click="currentPage !== 1 ? getTodos(currentPage - 1) : ''"
          >
            Previous
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in numOfPages"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" href="#" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            @click="currentPage !== numOfPages ? getTodos(currentPage + 1) : ''"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
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
    const numOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const numOfPages = computed(() => {
      return Math.ceil(numOfTodos.value / limit);
    });
    const searchText = ref("");

    const onCheckStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numOfTodos.value = res.headers["x-total-count"];
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
        console.log(res);
        // todos.value.push(res.data);
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

    const toggleTodo = async (index) => {
      const id = todos.value[index].id;
      try {
        const res = await axios.patch("http://localhost:3000/todos/" + id, {
          completed: !todos.value[index].completed,
        });
        console.log(res);
        todos.value[index].completed = !todos.value[index].completed;
      } catch (error) {
        console.log(error);
      }
    };

    watch(searchText, () => {
      getTodos(1);
    });
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter((todo) => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   return todos.value;
    // });

    return {
      todos,
      onCheckStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      getTodos,
      numOfPages,
      currentPage,
    };
  },
};
</script>

<style></style>
