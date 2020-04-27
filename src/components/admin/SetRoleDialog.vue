<template>
    <el-dialog
        title="分配角色"
        :visible="dialogVisible"
        @update:visible="$emit('update:dialogVisible', false)"
        width="50%"
        v-if="Object.keys(user).length > 0"
    >
        <div>
            <p>用户名称 ：{{ user.account }}</p>
            <p>
                用户旧角色 ：{{roleText(user.Role)}}
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
import {updateRole} from 'network/admin'
export default {
    name: 'SetRoleDialog',
    data() {
        return {
            roleslist: [
                {
                    value: 30,
                    label: '高级管理员'
                },
                { value: 2, label: '普通管理员' }
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
       async submit(){
           if(this.selectedId==='')
           return this.$message.error('请选择新分配的权限');
         const res= await updateRole(this.user.account,this.selectedId);
         if(res.status===200)
         {
                 this.$message.success('权限分配成功');  
                 this.$emit('allocateSuccess');
         }
         else{
             this.$message.error('权限分配失败');
             
         }
           
           
        },
        roleText(role) {
            switch(role)
            {
                case 3:
                return '普通管理员';
                case 31:
                return '高级管理员';
                case 63:
                return '系统管理员';
            }
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
