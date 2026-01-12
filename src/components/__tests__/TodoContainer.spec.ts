import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoContainer from '../TodoContainer.vue'
import { createVuetify } from 'vuetify'
import * as todoApi from '../../services/todoApi'

vi.mock('../../services/todoApi')

describe('TodoContainer.vue', () => {
  let vuetify: any

  beforeEach(() => {
    vuetify = createVuetify()
    vi.clearAllMocks()
  })

  const mockTodos = {
    data: [
      {
        id: 1,
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        completed: false
      },
      {
        id: 2,
        title: 'Finish project',
        description: 'Complete the feature',
        completed: false
      }
    ]
  }

  it('renders TodoInput and TodoList components', () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'TodoInput' }).exists() || wrapper.text().includes('Add a new todo item')).toBeTruthy()
    expect(wrapper.findComponent({ name: 'TodoList' }).exists() || wrapper.text().includes('Todo List')).toBeTruthy()
  })

  it('loads todos on mount', async () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(todoApi.getTodos).toHaveBeenCalledTimes(1)
  })

  it('handles addTodo event', async () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)
    vi.mocked(todoApi.createTodo).mockResolvedValue({ data: { id: 3, title: 'New Todo', description: 'Test', completed: false } })

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    const todoInput = wrapper.findComponent({ name: 'TodoInput' })
    if (todoInput.exists()) {
      await todoInput.vm.$emit('add-todo', { title: 'New Todo', description: 'Test' })
      await wrapper.vm.$nextTick()
      expect(todoApi.createTodo).toHaveBeenCalledWith({ title: 'New Todo', description: 'Test' })
      expect(todoApi.getTodos).toHaveBeenCalled()
    }
  })

  it('handles toggleTodo event', async () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)
    vi.mocked(todoApi.updateTodo).mockResolvedValue({ data: { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', completed: true } })

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    const todoList = wrapper.findComponent({ name: 'TodoList' })
    if (todoList.exists()) {
      await todoList.vm.$emit('toggle-todo', 1)
      await wrapper.vm.$nextTick()
      expect(todoApi.updateTodo).toHaveBeenCalledWith(1)
      expect(todoApi.getTodos).toHaveBeenCalled()
    }
  })

  it('handles deleteTodo event', async () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)
    vi.mocked(todoApi.deleteTodo).mockResolvedValue({ data: null })

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    const todoList = wrapper.findComponent({ name: 'TodoList' })
    if (todoList.exists()) {
      await todoList.vm.$emit('delete-todo', 1)
      await wrapper.vm.$nextTick()
      expect(todoApi.deleteTodo).toHaveBeenCalledWith(1)
      expect(todoApi.getTodos).toHaveBeenCalled()
    }
  })

  it('calls getTodos after creating a todo', async () => {
    vi.mocked(todoApi.getTodos).mockResolvedValue(mockTodos)
    vi.mocked(todoApi.createTodo).mockResolvedValue({ data: { id: 3, title: 'New Todo', description: 'Test', completed: false } })

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()
    vi.clearAllMocks()

    const todoInput = wrapper.findComponent({ name: 'TodoInput' })
    if (todoInput.exists()) {
      await todoInput.vm.$emit('add-todo', { title: 'New Todo', description: 'Test' })
      await wrapper.vm.$nextTick()
      expect(todoApi.getTodos).toHaveBeenCalled()
    }
  })

  it('handles errors during loadTodos gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(todoApi.getTodos).mockRejectedValue(new Error('API Error'))

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('sets loading state during API calls', async () => {
    vi.mocked(todoApi.getTodos).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockTodos), 100)))

    const wrapper = mount(TodoContainer, {
      global: {
        plugins: [vuetify],
        stubs: {
          TodoInput: true,
          TodoList: true
        }
      }
    })

    // Check loading state is true during API call
    expect(wrapper.vm.loading).toBe(true)
    
    // Check loading state is false after API call completes
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(wrapper.vm.loading).toBe(false)
  })
})
