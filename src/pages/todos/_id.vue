<template>
  <h2>Edit Todo</h2>
  <form @submit.prevent="editTodo">
    <div class="form-group">
      <label>Todo subject</label>
      <input v-model="todo" type="text" class="form-control" />
    </div>
    <button class="btn btn-primary mt-3" type="submit">save</button>
    <button class="btn btn-outline-dark mt-3 mx-3" @click="moveToHome">
      cancel
    </button>
  </form>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);

    const getTodo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/todos/" + route.params.id
        );
        todo.value = res.data.subject;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const editTodo = async () => {
      try {
        const res = await axios.patch(
          "http://localhost:3000/todos/" + route.params.id,
          {
            subject: todo.value,
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const moveToHome = () => {
      router.push("/");
    };

    getTodo();

    return {
      getTodo,
      todo,
      editTodo,
      moveToHome,
    };
  },
};
</script>

<style></style>
