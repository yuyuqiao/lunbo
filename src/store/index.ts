import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import salesroom from './modules/salesroom'
export default createStore({
    modules: {
        user,salesroom
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            key:'mine',
            paths: ['user']
        })
    ]
});
