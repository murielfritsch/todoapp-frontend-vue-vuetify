<script setup lang="ts">
import type { Todo } from '../interface'

defineProps<{
  todos: Todo[]
}>()

defineEmits<{
  toggleTodo: [id: number]
  deleteTodo: [id: number]
}>()
</script>

<template>
  <v-container class="todo-list" data-testid="todo-list-container">
    <h2 class="centered">Todo List</h2>
    <div v-if="todos.length === 0" class="empty-state" data-testid="todo-empty-state">
      No todos yet. Add one to get started!
    </div>
    <v-list v-else data-testid="todo-list">
      <v-list-item v-for="todo in todos" :key="todo.id" :data-testid="`todo-item-${todo.id}`">
        <div class="todo-content flex flex-aligned-horizontal">
          <v-checkbox
          :model-value="todo.completed"
          @update:model-value="$emit('toggleTodo', todo.id)"
          :data-testid="`todo-checkbox-${todo.id}`"
        />
          <div class="flex flex-aligned-vertical">
            <div class="todo-title" :class="{ completed: todo.completed }" :data-testid="`todo-title-${todo.id}`">
                {{ todo.title }}
            </div>
            <div class="todo-description" :class="{ completed: todo.completed }" :data-testid="`todo-description-${todo.id}`">{{ todo.description }}</div>
          </div>
          <v-btn
          class="todo-checkbox"
          icon="mdi-delete"
          variant="text"
          @click="$emit('deleteTodo', todo.id)"
          :data-testid="`todo-delete-btn-${todo.id}`"
          >
            <v-icon icon="fa-times" />  
          </v-btn> 
        </div>
        
      </v-list-item>
    </v-list>
  </v-container>
</template>

<style scoped>
.todo-list {
  margin: 1rem 0;
  text-align: center;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.todo-content {
  flex: 1;
  margin-left: 1rem;
}

.todo-title {
  font-weight: 500;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-description {
  font-size: 0.9rem;
  color: #666;
}

.todo-description.completed {
  text-decoration: line-through;
  color: #999;    
}

.todo-title, .todo-description {
  text-align: left;
}

.flex {
    display: flex;
}

.flex-aligned-horizontal {
    align-items: center;
}

.flex-aligned-vertical {
    flex-direction: column;
}
</style>