import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    info: [{
      name: 'Name',
      value: '',
      pattern: /^[a-zA-Z ]{2,30}$/,
      status: false
    }, {
      name: 'Phone',
      value: '',
      pattern: /^[0-9]{7,14}$/,
      status: false
    }, {
      name: 'Email',
      value: '',
      pattern: /.+/,
      status: false
    }, {
      name: 'Some Field 1',
      value: '',
      pattern: /.+/,
      status: false
    }, {
      name: 'Some Field 2',
      value: '',
      pattern: /.+/,
      status: false
    }],
    globalStatus: null
  },
  getters: {
    info(state) {
      return state.info;
    },
    globalStatus(state){
      return state.globalStatus;
    }
  },
  mutations: {
    changeStatus(state, payload) {
      state.info[payload.index].status = payload.status;
    },
    changeGlobalStatus(state, status) {
      state.globalStatus = status;
    }
  },
  actions: {
    send(store) {
      store.commit('changeGlobalStatus', 'loading');
      setTimeout(()=>{
        store.commit('changeGlobalStatus', 'done');
      }, 1000);
    }
  }
});