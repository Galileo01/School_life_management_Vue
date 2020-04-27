<template>
    <el-table border stripe :data="users"  size="small">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账户ID" prop="ID"></el-table-column>
        <el-table-column label="用户名" prop="account"></el-table-column>
        <el-table-column label="微信" prop="wechat"></el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        <el-table-column label="用户角色" >
            <template v-slot="{ row }">
               <span v-if="row.Role===63" class="red">系统管理员</span>
               <span v-else-if="row.Role===31" class="blue">高级管理员</span>
               <span v-else>普通管理员</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
            <template v-slot="{ row }">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="edit(row.ID)"

                >
                </el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteFun( row.account)"
                    size="mini"
                ></el-button>

                <el-tooltip
                    class="item"
                    effect="dark"
                    content="设置权限"
                    placement="top"
                    :enterable="false"
                >
                    <el-button
                        type="warning"
                        icon="el-icon-setting"
                        size="mini"
                        @click="allocate(row.ID)"
                    ></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {roleMixin} from 'commonjs/mixin'
export default {
    name: 'UsersTable',
    mixins:[roleMixin],
    props: {
        users: Array
    },
    data() {
        return {};
    },
    computed: {
    },
    methods: {
        edit(id) {
            if (this.userRole===3||(this.userRole!==63&&id===1)) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('edit', id);

            
        },

        deleteFun(account) {
            if (this.userRole===3||(this.userRole!==63&&id===1)) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('delete', 
                account
            );
        },
        allocate(id) {
            if (this.userRole===3||(this.userRole!==63&&id===1)) {
                this.$message.error('无法分配权限，你的权限太低');
                return;
            }
            this.$emit('allocate', id);
        },

        switchClick(userdata) {
            const { id, mg_state: type } = userdata;

            changeUserState(id, type).then(res => {
                if (res.meta.status !== 200) {
                    this.$message.error('状态更改失败');
                } else {
                    this.$message.success('状态更改成功');
                }
            });
        },
        
    }
};
</script>

<style scoped>
.red{
    color:#F56C6C;
}
.blue{
    color: #409EFF;
}
</style>
