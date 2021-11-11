import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://curso-vue-1b5f6-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        //Vue.prototype.$http = axios
        
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-1b5f6-default-rtdb.firebaseio.com/',
            headers: {
                // get: {
                //     "Authorization" : "#$asdads%#$Aadsa"
                // }
                "Authorization" : "#$asdads%#$Aadsa"
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            // eslint-disable-next-line no-console
            console.log(config)
            return config
        }, error => Promise.reject(error))

        Vue.prototype.$http.interceptors.response.use(res => {

            const array = []
            for(let chave in res.data) {
                array.push({ id: chave, ...res.data[chave] })
                // eslint-disable-next-line no-console
                console.log('passou na reposta')
            }
            return array
        }, error => Promise.reject(error))
    }
})

