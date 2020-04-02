<template>
    <el-dialog
        title="分配角色"
        :visible="dialogVisible"
        @update:visible="$emit('update:dialogVisible', false)"
        width="50%"
        v-if="Object.keys(user).length > 0"
    >
        <div>
            <p>用户名称 ：{{ user.username }}</p>
            <p>
                用户旧角色 ：<span v-if="user.role === 0">系统管理员</span>
                <span v-else>普通管理员</span>
            </p>
            分配的新角色<el-select v-model="selectedId" placeholder="请选择">
                <el-option
                    v-for="item in roleslist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>

        <span slot="footer">
            <el-button @click="$emit('update:dialogVisible', false)"
                >取 消</el-button
            >
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'SetRoleDialog',
    data() {
        return {
            roleslist: [
                {
                    value: 0,
                    label: '系统管理员'
                },
                { value: 1, label: '普通管理员' }
            ],
            selectedId: ''
        };
    },
    props: {
        dialogVisible: Boolean,
        user: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        submit(){
           
           this.$message.success('角色分配成功');
           
        }
    },
    created() {
        //获取所有 角色列表
    }
};
</script>

<style scoped>
.el-select {
    margin-left: 10px;
}
</style>
