import type { Todo } from '@/interface';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = () => api.get('/todos');

export const createTodo = (todoObject: Partial<Todo>) =>
  api.post('/todos', { title: todoObject.title, description: todoObject.description });

export const updateTodo = async (id: number) => {
  console.log("id - ", id);
  const res = await api.put(`/todos/${id}`);
  console.log('res - ', res);
  console.log('res.data - ', res.data);

  return res.data;
}

export const deleteTodo = (id: number) =>
  api.delete(`/todos/${id}`);