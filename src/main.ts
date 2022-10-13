//packages
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

// primevue css
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
//components
import App from './App.vue'
import components from './components/shared'

// routes
import router from './router'

// directivies
import directives from './directives'


const pinia = createPinia()
const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(PrimeVue)
    .use(pinia)
    .use(router)
    .mount('#app')
