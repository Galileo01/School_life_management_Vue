<template>
    <el-dialog
        title="编辑用户信息"
        :visible="dialogVisible"
        @update:visible="$emit('update:dialogVisible', false)"
        width="600px"
        v-if="Object.keys(userdata).length>0"
    >
        <el-form :model="userdata" :rules="editFormRules" ref="editForm">
            <el-form-item label="用户名" label-width="70px">
                <el-input v-model="userdata.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="微信" label-width="70px" prop="wx">
                <el-input v-model="userdata.wx"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="70px" prop="mobile">
                <el-input v-model="userdata.mobile"></el-input>
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
                wx: [
                    { required: true, message: '请输入微信', trigger: 'blur' },
                    
                ],
                mobile: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
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
            this.$refs.editForm.validate(valid=>{
              if(!valid)
                return ;
                this.$message.success('用户信息更新成功');
                this.$emit('update:dialogVisible',false);
            })
        },
    }
};
</script>

<style></style>
