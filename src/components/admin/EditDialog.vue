<template>
    <el-dialog
        title="编辑用户信息"
        :visible="dialogVisible"
        @update:visible="$emit('update:dialogVisible', false)"
        width="600px"
        v-if="Object.keys(userdata).length>0"
        @close="clear"
    >
        <el-form :model="userdata" :rules="editFormRules" ref="editForm">
            <el-form-item label="用户名" label-width="70px">
                <el-input v-model="userdata.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="微信" label-width="70px" prop="wx">
                <el-input v-model="userdata.wechat"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="70px" prop="mobile">
                <el-input v-model="userdata.tel"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:dialogVisible', false)"
                >取 消</el-button
            >
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { emailCheck, mobileCheck } from 'commonjs/utils';
import {updateAdmin} from 'network/admin'
export default {
    name: 'EditDialog',
    props: {
        dialogVisible: Boolean,
        userdata:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    computed:{
        operateID(){
            return this.opUser.id;
        }
    },
    data() {
        return {
            
            editFormRules: {
                wechat: [
                    {  message: '请输入微信', trigger: 'blur' },
                    
                ],
                tel: [
                    {  message: '请输入电话', trigger: 'blur' },
                    {
                        validator: mobileCheck,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        submit(){
            this.$refs.editForm.validate( async valid=>{
              if(!valid)
                return ;
                const res= await updateAdmin(this.userdata);
                if(res.status===200)
                {
                    this.$message.success('用户信息更新成功');
                }
                else{
                    this.$message.error('用户信息更新失败');
                }
                
                this.$emit('editSuccess');
            })
        },
        clear(){
            this.$refs.editForm.resetFields();
        }
    }
};
</script>

<style></style>
