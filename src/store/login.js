import { url } from './url'
import axios from 'axios'
export const login = {
    namespaced: true,

    state: {

        isLogged: false,
        loggedUserData: {},
        loginError: "",
        tokenStatus: false,
        roleId: ''

    },
    getters: {

        logginError(state) {
            return state.logginError
        }

    },
    mutations: {

        saveLoggedData(state, payload) {

            if (payload.data.success == true) {
                state.isLogged = true
                state.loggedUserData = payload.data
                // console.log(payload.data)
                state.loginError = {}
                state.roleId = payload.data.data.roleId
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('access_token', payload.data.data.token)
            } else {
                state.isLogged = false
                state.loggedUserData = {}
                state.loginError = payload.data.errors.error
                localStorage.removeItem('loginStatus')
                localStorage.removeItem('access_token')
            }
        },

        saveTokenDetails(state, payload) {
            
            if (payload.data.success == true) {
                state.tokenStatus = true

            } else {
                state.tokenStatus = false
            }

        }
    },

    actions: {

        async userLogin(context, payload) {

            try {
                let result = await axios.post(`${url}/login`, payload)
                context.commit('saveLoggedData', result)
            }
            catch (err) {
                // console.log(err.response.data.errors.error)
                context.commit('saveLoggedData', err.response)
            }
        },

        async checkUserTokenValidation(context, payload) {

            try {
                let result = await axios.post(`${url}/admin/profile`, payload)
                context.commit('saveTokenDetails', result)
            }
            catch (err) {
                // console.log(err.response.data.errors.error)
                context.commit('saveTokenDetails', err.response)
            }
        }
    }

}