<template>
    <div class="home">
        <el-container>
            <el-header>
                <div class="logo-wapper">
                    <img src="~assets/img/logo.png" alt="" class="logo" />
                    <h3>便捷校园宝 后台Web 管理系统</h3>
                </div>
                <div class="left-wapper">
                    <div class="avator" @click="goProfile">
                        <el-tooltip
                            effect="light"
                            content="设置个人信息"
                            placement="bottom"
                        >
                            <img
                                src="https://note.youdao.com/yws/api/image/normal/1576755416467?userId=1354541676%40qq.com"
                                alt=""
                            />
                        </el-tooltip>
                        <span>{{ userInfo.username }}</span>
                    </div>
                    <el-button size="mini" type="danger" @click="logout"
                        >退出</el-button
                    >
                </div>
            </el-header>
            <el-container>
                <el-aside :width="asideWidth"
                    ><div class="collapse" @click="collapse">
                        <i :class="iconClass"></i>
                    </div>
                    <HomeAsideMenu
                        :menulist="menulist"
                        :iconlist="iconlist"
                        :isCollapse="isCollapse"
                    ></HomeAsideMenu
                ></el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import HomeAsideMenu from 'components/home/HomeAsideMenu';
export default {
    name: 'Home',
    data() {
        return {
            //侧边栏 菜单
            menulist: [],
            iconlist: [], //菜单 icon 类名,
            isCollapse: false, //是否折叠
            userInfo: {
                username: 'admin',
                id: '666'
            }
        };
    },
    computed: {
        iconClass() {
            let c = 'el-icon-d-arrow-';
            if (this.isCollapse) {
                c += 'right';
            } else c += 'left';
            return c;
        },
        asideWidth() {
            if (this.isCollapse) {
                return '50px';
            } else {
                return '160px';
            }
        }
    },
    methods: {
        async logout() {
            const result = await this.$confirm(
                '此操作将退出此系统, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(error => error);
            console.log(result);

            if (result === 'cancel') {
                this.$message.info('操作取消');
            } else {
                window.sessionStorage.removeItem('token');
                this.$router.push('/login');
                this.$message.success('成功退出');
            }
        },
        collapse() {
            this.isCollapse = !this.isCollapse;
        },
        goProfile() {
            this.$router.push(`/home/person_info:${this.userInfo.id}`);
        }
    },
    components: {
        HomeAsideMenu
    },
    created() {
        this.menulist = [
            {
                id: 100,
                authName: '用户管理',
                path: '',
                children: [
                    {
                        id: 101,
                        authName: '用户列表',
                        path: 'home/users',
                        children: []
                    }
                ]
            },
            {
                id: 300,
                authName: '权限管理',
                path: '',
                children: [
                    {
                        id: 301,
                        authName: '角色列表',
                        path: 'home/roles',
                        children: []
                    }
                ]
            },
            {
                id: 400,
                authName: '订单管理',
                path: '',
                children: [
                    {
                        id: 401,
                        authName: '订单列表',
                        path: 'home/order',
                        children: []
                    }
                ]
            },
            {
                id: 500,
                authName: '数据管理',
                path: '',
                children: [
                    {
                        id: 501,
                        authName: '数据报表',
                        path: 'home/report',
                        children: []
                    }
                ]
            },
            {
                id: 700,
                authName: '个人设置',
                path: '',
                children: [
                    {
                        id: 701,
                        authName: '信息修改',
                        path: 'home/location',
                        children: []
                    }]
            },{
                id: 800,
                authName: '其他',
                path: '',
                children: [
                    {
                        id: 801,
                        authName: '关于',
                        path: 'home/about',
                        children: []
                    }]
            }
    
        ];
        this.iconlist = [
            'yuangong',
            'quanxian',
            'order',
            'shuju',
            'ren',
            'guanyu'
        ];
    }
};
</script>

<style scoped lang="less">
.home {
    height: 100%;
}
.el-container {
    height: 100%;
}
.el-header {
    background-color: #373d41;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center; /*文字居中*/
    height: 50px !important;
    // border-bottom: 2px solid #fefefe;
    .logo-wapper {
        display: flex;
        height: 50px;
        align-items: center;
        img{
            border-radius: 50%;
        }
        
    }
    .logo {
        height: 40px;
        margin: 5px 0;
    }
    h3 {
        margin-left: 10px;
    }
}
.el-aside {
    background-color: #333744;
    overflow-x: hidden;
}
.collapse {
    background-color: #4a5064;
    font-size: 16px; //给图标 设置大小
    height: 28px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    i {
        margin: 2px 0;
        border-radius: 50%;
        background-color: #fff;
        height: 20px;
        width: 20px;
        line-height: 20px;
    }
}
.el-main {
    background-color: #eaedf1;
    // border-left: 1px solid #d2d6de;
    padding: 10px;
}
.left-wapper {
    margin-right: 10px;
    display: flex;
    align-items: center;
    .avator {
        margin-right: 30px;
        cursor: pointer;
        img {
            height: 34px;
            width: 34px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
}
</style>
