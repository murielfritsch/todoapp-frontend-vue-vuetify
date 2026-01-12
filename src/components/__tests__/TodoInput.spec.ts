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
    const titleInput = wrapper.find('[data-testid="todo-input-title"]')
    const descriptionInput = wrapper.find('[data-testid="todo-input-description"]')
    expect(titleInput.exists()).toBe(true)
    expect(descriptionInput.exists()).toBe(true)
  })

  it('has a create todo button', () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })
    
    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    expect(createBtn.exists()).toBe(true)
    expect(createBtn.text()).toContain('Create Todo')
  })

  it('emits addTodo event when form is submitted with valid title', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const component = wrapper.vm as any
    component.newTodo.title = 'Test Todo'
    component.newTodo.description = 'Test Description'
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

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

    const component = wrapper.vm as any
    component.newTodo.title = ''
    component.newTodo.description = 'Test Description'
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('addTodo')
  })

  it('does not emit addTodo event when title is only whitespace', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const component = wrapper.vm as any
    component.newTodo.title = '   '
    component.newTodo.description = 'Test Description'
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('addTodo')
  })

  it('clears form after successful submission', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const component = wrapper.vm as any
    component.newTodo.title = 'Test Todo'
    component.newTodo.description = 'Test Description'
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

    expect(component.newTodo.title).toBe('')
    expect(component.newTodo.description).toBe('')
  })

  it('allows empty description', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const component = wrapper.vm as any
    component.newTodo.title = 'Test Todo'
    component.newTodo.description = ''
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('addTodo')
    const addTodoEvents = wrapper.emitted('addTodo')
    expect(addTodoEvents?.[0]).toEqual([
      { title: 'Test Todo', description: '' }
    ])
  })

  it('preserves description when emitting event', async () => {
    const wrapper = mount(TodoInput, {
      global: {
        plugins: [vuetify]
      }
    })

    const component = wrapper.vm as any
    component.newTodo.title = 'Important Task'
    component.newTodo.description = 'This is a detailed description'
    
    await wrapper.vm.$nextTick()

    const createBtn = wrapper.find('[data-testid="todo-create-btn"]')
    await createBtn.trigger('click')

    const addTodoEvents = wrapper.emitted('addTodo')
    expect(addTodoEvents?.[0]).toEqual([
      { title: 'Important Task', description: 'This is a detailed description' }
    ])
  })
})
