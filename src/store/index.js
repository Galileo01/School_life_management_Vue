import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userdata: {
        },
        activePath: ''
    },
    mutations: {
        getUserdata(state, payload) {
            const { admin_id, account, tel, email, qq, wechat, Role } = payload;
            state.userdata = {
                admin_id,
                account,
                Role,
                tel,
                email,
                qq,
                wechat
            };
            localStorage.setItem('account',account);
            localStorage.setItem('Role',Role);
        },
        changeActivePath(state, path) {
            state.activePath = path;
        },
        changePass(state,thenew)
        {
                state.userdata.password=thenew;
        }
    },
    actions: {},
    modules: {},
    getters: {
        userRole(state) {
            return state.userdata.Role||localStorage.getItem('Role');
        },
        userdata(state) {
            return state.userdata;
        },
        activePath(state) {
            return state.activePath;
        },
        account(state)
        {
            return state.userdata.account||localStorage.getItem('account');
        }
    }
});
