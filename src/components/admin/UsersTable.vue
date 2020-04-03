<template>
    <el-table border stripe :data="users">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账户ID" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="微信" prop="wx"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="用户角色" prop="role">
            <template v-slot="{ row }">
                {{ roleText(row.role) }}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
            <template v-slot="{ row }">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="edit(row.id)"

                >
                </el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteFun( row.id)"
                    size="mini"
                ></el-button>

                <el-tooltip
                    class="item"
                    effect="dark"
                    content="设置角色"
                    placement="top"
                    :enterable="false"
                >
                    <el-button
                        type="warning"
                        icon="el-icon-setting"
                        size="mini"
                        @click="allocate(row.id)"
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
            if (this.userRole!==0) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('edit', id);

            
        },

        deleteFun(id) {
            if ( this.userRole!==0 ) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('delete', {
                id
            });
        },
        allocate(id) {
            if (this.userRole !==0) {
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
        roleText(role) {
            if (role === 0) {
                return '系统管理员';
            } else return '普通管理员';
        }
    }
};
</script>

<style></style>
