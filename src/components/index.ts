import {App} from 'vue';
import Breadcrumb from './breadcrumb.vue'
//use([Breadcrumb])
export default {
    install(Vue: App){
        Vue.component('Breadcrumb', Breadcrumb)
    }
}