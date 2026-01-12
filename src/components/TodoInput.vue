<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../interface'

const emit = defineEmits<{
  addTodo: [todo: Partial<Todo>]
}>()

const newTodo = ref({ title: "", description: "" });

const handleAddTodo = () => {
  if (newTodo.value.title.trim()) {
    emit('addTodo', { ...newTodo.value });
    newTodo.value = { title: "", description: "" };
  }
}
</script>

<template>
  <v-container class="todo-inputs flex" data-testid="todo-input-container">
    <h2>Add a new todo item</h2>
    <div>
      <v-text-field
        v-model="newTodo.title"
        label="title"
        data-testid="todo-input-title"
      />
      <v-text-field 
        v-model="newTodo.description" 
        label="description"
        data-testid="todo-input-description"
      />
      <v-btn @click="handleAddTodo" data-testid="todo-create-btn">Create Todo</v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.todo-inputs {
  margin: 1rem 0;
}

.centered {
    text-align: center;
}
</style>