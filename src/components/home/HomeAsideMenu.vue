<template>
    <el-menu
        v-if="menulist.length !== 0"
        class="aside-menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        text-color="#fff"
        active-text-color="#409EFF"
        background-color="#333744"
        :default-active="activePath"
        router
        unique-opened
    >
        <!--一级菜单 内容-->
        <el-submenu
            v-for="(item, index) in menulist"
            :key="item.id"
            :index="item.id + ''"
        >
            <template slot="title">
                <i :class="['iconfont', 'icon-' + iconlist[index]]"></i>
                <span class="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.id"
                :index="'/' + subItem.path"
                @click="savePath(subItem.path)"
            >
                <span>{{ subItem.authName }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: 'HomeAsideMenu',
    data() {
        return {
        };
    },
    computed:{
        activePath(){
            return this.$store.getters.activePath;
        }
    },
    props: {
        menulist: Array, //侧边栏 菜单
        iconlist: Array, //菜单 icon 类名
        isCollapse: Boolean
    },
    methods: {
        savePath(path) {
            window.sessionStorage.setItem('activePath', '/' + path);
            this.$store.commit('changeActivePath', '/' + path);
        },
        getActivePath() {
            const path = sessionStorage.getItem('activePath');
            if (path) {
                this.$store.commit('changeActivePath', path);
            }
        }
    },
    created() {
        this.getActivePath();
    }
};
</script>

<style scoped lang="less">
.aside-menu {
    overflow-x: hidden;
    border: none;
    /deep/ span {
        font-size: 13px;
    }
    .title {
        margin-left: 10px;
    }
    /deep/ .el-submenu__title i {
        color: #fff;
    }
}
</style>
