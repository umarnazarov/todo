import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import components from './components/shared'
import directives from './directives'


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(store, key)
    .use(router)
    .mount('#app')
