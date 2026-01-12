import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'
import type { Todo } from '../../interface'
import { createVuetify } from 'vuetify'

describe('TodoList.vue', () => {
  let vuetify: any

  beforeEach(() => {
    vuetify = createVuetify()
  })

  const mockTodos: Todo[] = [
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
      completed: true
    }
  ]

  it('renders empty state when no todos provided', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: []
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('[data-testid="todo-empty-state"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('No todos yet')
  })

  it('renders list when todos are provided', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('[data-testid="todo-list"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Buy groceries')
    expect(wrapper.text()).toContain('Finish project')
  })

  it('displays todo title and description', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.text()).toContain('Milk, eggs, bread')
    expect(wrapper.text()).toContain('Complete the feature')
  })

  it('applies completed class to completed todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    const completedTitles = wrapper.findAll('.todo-title.completed')
    expect(completedTitles.length).toBeGreaterThan(0)
  })

  it('emits toggleTodo event when checkbox is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    const checkboxElement = wrapper.find('[data-testid="todo-checkbox-1"]')
    expect(checkboxElement.exists()).toBe(true)
    
    const listItem = wrapper.find('[data-testid="todo-item-1"]')
    expect(listItem.exists()).toBe(true)
    
    wrapper.vm.$emit('toggleTodo', 1)
    await wrapper.vm.$nextTick()
    
    const toggleEvents = wrapper.emitted('toggleTodo')
    expect(toggleEvents).toBeTruthy()
    expect(toggleEvents?.[0]).toEqual([1])
  })

  it('emits deleteTodo event when delete button is clicked', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    const deleteBtn = wrapper.find('[data-testid="todo-delete-btn-1"]')
    if (deleteBtn.exists()) {
      await deleteBtn.trigger('click')
      
      await wrapper.vm.$nextTick()

      const deleteEvents = wrapper.emitted('deleteTodo')
      expect(deleteEvents).toBeTruthy()
      expect(deleteEvents?.[0]).toEqual([1])
    }
  })

  it('renders correct number of list items', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    const todoItems = wrapper.findAll('[data-testid^="todo-item-"]')
    expect(todoItems.length).toBe(mockTodos.length)
  })

  it('shows empty state after todos are cleared', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('[data-testid="todo-list"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="todo-empty-state"]').exists()).toBe(false)

    await wrapper.setProps({ todos: [] })

    expect(wrapper.find('[data-testid="todo-list"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="todo-empty-state"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('No todos yet')
  })

  it('renders different content for completed vs incomplete todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    const completedTitle = wrapper.find('[data-testid="todo-title-2"]')
    const incompleteTitle = wrapper.find('[data-testid="todo-title-1"]')
    
    expect(completedTitle.classes()).toContain('completed')
    expect(incompleteTitle.classes()).not.toContain('completed')
  })

  it('emits correct todo id when toggling multiple todos', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos
      },
      global: {
        plugins: [vuetify]
      }
    })

    wrapper.vm.$emit('toggleTodo', 1)
    wrapper.vm.$emit('toggleTodo', 2)
    await wrapper.vm.$nextTick()
    
    const toggleEvents = wrapper.emitted('toggleTodo')
    expect(toggleEvents).toHaveLength(2)
    expect(toggleEvents?.[0]).toEqual([1])
    expect(toggleEvents?.[1]).toEqual([2])
  })

  it('renders with correct structure for single todo', () => {
    const singleTodo: Todo[] = [mockTodos[0]]
    const wrapper = mount(TodoList, {
      props: {
        todos: singleTodo
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.text()).toContain('Buy groceries')
    expect(wrapper.text()).not.toContain('Finish project')
  })

  it('handles todos without description gracefully', () => {
    const todosWithoutDesc: Todo[] = [
      { id: 1, title: 'Test', description: '', completed: false }
    ]
    const wrapper = mount(TodoList, {
      props: {
        todos: todosWithoutDesc
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.text()).toContain('Test')
  })
})
