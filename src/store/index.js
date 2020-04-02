import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userdata:{"id":"2544","username":"admin","token":"2544","role":0},
    activePath:''
  },
  mutations: {
    getUserdata(state,payload)
    {
      const {id,username,token,role}=payload;
      state.userdata={
        id,username,token,role
      }
    },
    changeActivePath(state,path)
    {
      state.activePath=path;
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    userRole(state){
        return state.userdata.role;
    },
    userdata(state){
      return state.userdata;
    }
  }
})
