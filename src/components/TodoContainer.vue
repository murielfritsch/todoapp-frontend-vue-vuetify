<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoApi';
import type { Todo } from '../interface'
import TodoInput from './TodoInput.vue';
import TodoList from './TodoList.vue';

const todos = ref<Todo[]>([]);
const loading = ref(false);

const loadTodos = async () => {
  loading.value = true;
  try {
    const res = await getTodos();
    todos.value = res.data;
  } catch (error) {
    console.error('Error loading todos:', error);
  } finally {
    loading.value = false;
  }
};

const handleAddTodo = async (newTodo: Omit<Todo, 'id'>) => {
  try {
    await createTodo(newTodo);
    await loadTodos();
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

const handleToggleTodo = async (id: number) => {
  try {
    await updateTodo(id);
    await loadTodos();
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

const handleDeleteTodo = async (id: number) => {
  try {
    await deleteTodo(id);
    await loadTodos();
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

onMounted(loadTodos);
</script>

<template>
  <div class="todo-container">
    <div class="content-wrapper">
      <div class="todo-input-section">
        <TodoInput @add-todo="handleAddTodo" />
      </div>
      <div class="todo-list-section">
        <TodoList 
          :todos="todos"
          @toggle-todo="handleToggleTodo"
          @delete-todo="handleDeleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  flex: 1;
  display: flex;
  width: 100%;
  padding: 2rem 1rem;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.todo-list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .todo-input-section {
    flex: 0 0 auto;
  }

  .todo-list-section {
    flex: 1;
  }
}
</style>