import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://curso-vue-1b5f6-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
        Vue.prototype.$http.interceptors.request.use(config => {
            // eslint-disable-next-line no-console
            console.log(config)
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {

            const array = []
            for(let chave in res.data) {
                array.push({ id: chave, ...res.data[chave]})
            }
            return array
        }, error => Promise.reject(error))
    }
})

