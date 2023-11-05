import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUsers, faBars, faGaugeHigh, faDoorOpen, faListOl, faChevronDown, faArrowRightArrowLeft, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from "@/components/ButtonComponent.vue";
import DropdownComponent from "@/components/DropdownComponent.vue";

/* add icons to the library */
library.add(faUsers, faBars, faGaugeHigh, faDoorOpen, faListOl, faChevronDown, faArrowRightArrowLeft, faNewspaper)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ButtonComponent', ButtonComponent)
app.component('DropdownComponent', DropdownComponent)

app.use(router)

app.mount('#app')
