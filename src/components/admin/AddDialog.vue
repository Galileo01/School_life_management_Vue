<template>
    <el-dialog
        title="添加管理员"
        :visible="dialogVisible"
        @update:visible="$emit('update:dialogVisible', false)"
        width="30%"
        @close="clear"
    >
        <!--由于表单组件 被分离，必须舍弃.sync 修饰符，
       必须向外通知 visible 属性的更新 -->
        <el-form
            :model="newUser"
            :rules="addFormrules"
            ref="form"
            label-width="70px"
            @keyup.enter.native="submit"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="newUser.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="newUser.password"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wx">
                <el-input v-model="newUser.wx"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
                <el-input v-model="newUser.mobile"></el-input>
            </el-form-item>
            <el-form-item label="等级">
                <el-select v-model="newUser.role">
                    <el-option
                        v-for="(item, index) in selections"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
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
import { addAdmin } from 'network/admin';
export default {
    name: 'AddDialog',
    data() {
        return {
            newUser: {
                username: '',
                password: '',
                wx: '',
                mobile: '',
                role: 2 //默认 普通管理员
            },
            addFormrules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
                //邮箱和 电话使用自定义的 验证规则
                wx: [{ message: '请输入微信', trigger: 'blur' }],
                mobile: [{ message: '请输入电话', trigger: 'blur' }]
            },
            selections: [
                {
                    value: 2,
                    label: '普通管理员'
                },
                {
                    value: 30,
                    label: '高级管理员'
                }
            ]
        };
    },
    props: {
        dialogVisible: Boolean
    },
    methods: {
        submit() {
            this.$refs.form.validate(async valid => {
                if (!valid) return;
                else {
                    const res = await addAdmin(
                        this.newUser.username,
                        this.newUser.password,
                        this.newUser.role
                    );
                    console.log(res);

                    if (res.status === 200) {
                        this.$message.success('成功添加管理员');
                        this.$emit('addsuccess');
                    }
                    else{
                      this.$message.error('添加失败');
                      
                    }
                }
            });
        },
        clear() {
            this.$refs.form.resetFields();
        }
    }
};
</script>

<style></style>
