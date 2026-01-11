import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoInput from '../TodoInput.vue'
import { createVuetify } from 'vuetify'

describe('TodoInput.vue', () => {
  let vuetify: any

  beforeEach(() => {
    vuetify = createVuetify()
  })

  it('renders the form with title and description fields', () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })
    
    expect(wrapper.text()).toContain('Add a new todo item')
    expect(wrapper.findAll('input').length).toBeGreaterThanOrEqual(2)
  })

  it('has a create todo button', () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })
    
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Create Todo')
  })

  it('emits addTodo event when form is submitted with valid title', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('Test Todo')
    await inputs[1].setValue('Test Description')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('addTodo')
    const addTodoEvents = wrapper.emitted('addTodo')
    expect(addTodoEvents).toHaveLength(1)
    expect(addTodoEvents?.[0]).toEqual([
      { title: 'Test Todo', description: 'Test Description' }
    ])
  })

  it('does not emit addTodo event when title is empty', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('')
    await inputs[1].setValue('Test Description')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('addTodo')
  })

  it('does not emit addTodo event when title is only whitespace', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('   ')
    await inputs[1].setValue('Test Description')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('addTodo')
  })

  it('clears form after successful submission', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('Test Todo')
    await inputs[1].setValue('Test Description')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.find('input').element).toHaveValue('')
  })
})
