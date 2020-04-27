<template>
    <el-table border stripe :data="users" size="small">
        <el-table-column type="index"></el-table-column>
         <el-table-column label="用户ID" prop="userID" width="300px"></el-table-column>
        <el-table-column label="用户名" prop="account"></el-table-column>
        <el-table-column label="微信" prop="wechat"></el-table-column>
        <el-table-column label="电话" prop="tel"></el-table-column>
        
        <el-table-column label="状态">
            <template v-slot="{ row }">
                <el-switch v-model="row.state" @change="_updateState(row.userID,row.state)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
            <template v-slot="{ row }">
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="edit(row.userID)"

                >
                </el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteFun( row.userID)"
                    size="mini"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {roleMixin} from 'commonjs/mixin'
import {updateState } from 'network/users'
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
        UserRole() {
            return this.$store.getters.userRole;
        }
    },
    methods: {
        edit(id) {
            if (this.userRole===3) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('edit', id);  
        },

      deleteFun(id) {
            if(this.userRole===3) {
                this.$message.error('无法继续操作，你的权限太低');
                return;
            }
            this.$emit('delete', {
                id
            });
        },
        allocate(id) {
            if (this.UserRole !==0) {
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
       async _updateState(ID,newstate)
        {
            console.log(newstate,ID);
            const res= await updateState(newstate,ID);
            if(res.status!==200)
            this.$message.error('状态更新失败');
            else{
                this.$message.success('状态更新成功');
                
            }
        }
    }
};
</script>

<style></style>
