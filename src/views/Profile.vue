<template>
    <div class="profile">
        <BreadNav :texts="['个人设置', '信息修改']" />
        <el-card>
            <el-row>
                <el-col :span="10" :offset="5">
                    <el-form :model="userdata" ref="form" :rules="rules">
                        <el-form-item label="用户名" prop="account">
                            <el-input v-model="userdata.account"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="userdata.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="微信" prop="wechat">
                            <el-input v-model="userdata.wechat"></el-input
                        ></el-form-item>
                        <el-form-item label="QQ">
                            <el-input v-model="userdata.qq"></el-input
                        ></el-form-item>
                        <el-form-item label="电话" prop="tel">
                            <el-input v-model="userdata.tel"></el-input
                        ></el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="userdata.email"></el-input
                        ></el-form-item>
                        <el-form-item class="submit-wapper">
                            <el-button type="primary" @click="submit"
                                >提交</el-button
                            ></el-form-item
                        >
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { emailCheck, mobileCheck } from 'commonjs/utils';
export default {
    name: 'Profile',
    data() {
        return {
            userdata: this.$store.getters.userdata,
            fileList: [],
            radio: '1',
            rules: {
                account: [
                    { message: '请输入电话', trigger: 'blur' },
                    {
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
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur'
                    }
                ],
                //邮箱和 电话使用自定义的 验证规则
                email: [
                    {
                        validator: emailCheck,
                        trigger: 'blur'
                    }
                ],
                tel: [
                    {
                        validator: mobileCheck,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        reset() {
            this.$refs.form.resetFields();
        },
        submit() {
            this.$message.success('信息更新成功');
        }
    },
    beforeDestroy() {
        this.reset();
    }
};
</script>

<style scoped lang="less">
.profile {
    .left {
        display: flex;
        align-items: center;
        .avator {
            width: 200px;
            height: 200px;
            margin-left: 20px;
            background-image: url(http://139.129.204.115:8080/TPSMPKQ/images/default-avatar.jpg);
            background-size: 100% 100%;
            img {
                width: 200px;
                height: 200px;
            }
            /deep/.el-upload {
                width: 100px;
                margin: 10px 0 0 50px;
            }
            .el-upload__tip {
                text-align: center;
            }
        }
    }
    .el-form-item {
        margin-bottom: 0;
    }
    /deep/ .submit-wapper .el-form-item__content {
        display: -webkit-box;
        justify-content: end;
        margin-top: 10px;
    }
}
</style>
