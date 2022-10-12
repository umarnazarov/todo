import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import components from './components/shared'
import directives from './directives'
import { createPinia } from 'pinia'
	const pinia = createPinia()


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(pinia)
    .use(router)
    .mount('#app')
