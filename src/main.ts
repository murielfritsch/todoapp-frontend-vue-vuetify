import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

/* optional italic styles */
import '@fontsource/roboto/100-italic.css'
import '@fontsource/roboto/300-italic.css'
import '@fontsource/roboto/400-italic.css'
import '@fontsource/roboto/500-italic.css'
import '@fontsource/roboto/700-italic.css'
import '@fontsource/roboto/900-italic.css'

import 'font-awesome/css/font-awesome.min.css' // Ensure your project is capable of handling css files
import { aliases, fa } from 'vuetify/iconsets/fa4'
//import { aliases, mdi } from 'vuetify/iconsets/mdi'

// TODO - import only used compoennts to avoid slowing down build
//vuetify/components/<name>	
// ==> Individual components. Grouped by top-level name, for example VListItem, VListGroup, and VListItemTitle are all in vuetify/components/VList.

// TODO - import only used directives
// vuetify/directives/<name>
// ==> Individual directives.

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    //defaultSet: 'mdi',
    defaultSet: 'fa',
    aliases,
    sets: {
      //mdi,
      fa
    },
  },
})

createApp(App)
    .use(vuetify)
    .mount('#app')
