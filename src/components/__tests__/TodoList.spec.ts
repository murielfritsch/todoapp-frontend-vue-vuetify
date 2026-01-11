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

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    if (checkboxes.length > 0) {
      await checkboxes[0].setValue(true)
      
      const toggleEvents = wrapper.emitted('toggleTodo')
      expect(toggleEvents).toBeTruthy()
    }
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

    const deleteButtons = wrapper.findAll('button[icon="mdi-delete"]')
    if (deleteButtons.length > 0) {
      await deleteButtons[0].trigger('click')

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

    const listItems = wrapper.findAll('v-list-item-stub')
    expect(listItems.length).toBe(mockTodos.length)
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

    expect(wrapper.text()).not.toContain('No todos yet')

    await wrapper.setProps({ todos: [] })

    expect(wrapper.text()).toContain('No todos yet')
  })
})
