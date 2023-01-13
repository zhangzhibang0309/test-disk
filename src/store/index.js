import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//创建Vuex实例对象
const store = new Vuex.Store({
    namespaced: true,
    state: {
        curActive: ""
    },
    getters: {
    },
    mutations: {
        changeCurActive(state, val) {
            state.curActive = val;
        },
    },
    actions: {
    }
})
export default store;

