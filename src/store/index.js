import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        apple:1
    },
    mutations: {
        add(state,num){
            state.apple += num
        }
    },
    actions:{
        del(context){
            context.commit('add',1)
        }
    }
})