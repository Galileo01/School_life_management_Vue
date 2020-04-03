import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userdata: {
            account: 'admin',
            admin_id:123,
            token:'123121321',
            Role:0,
            tel: '123131313331',
            qq: '14545432546',
            wechat: 'sdasdasdasd',
            avatar:
                'https://note.youdao.com/yws/api/image/normal/1576755416467?userId=1354541676%40qq.com'
        },
        activePath: ''
    },
    mutations: {
        getUserdata(state, payload) {
            const { id, username, token, role } = payload;
            state.userdata = {
                id,
                username,
                token,
                role
            };
        },
        changeActivePath(state, path) {
            state.activePath = path;
        }
    },
    actions: {},
    modules: {},
    getters: {
        userRole(state) {
            return state.userdata.role;
        },
        userdata(state) {
            return state.userdata;
        }
    }
});
