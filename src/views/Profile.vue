<template>
    <div class="profile">
        <BreadNav :texts="['个人设置', '信息修改']" />
        <el-card>
            <el-row>
                <el-col :span="10" :offset="1">
                    <el-form :model="userdata" ref="form" :rules="rules">
                        <el-form-item label="用户名" prop="account">
                            <el-input v-model="userdata.account"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="密码"
                            prop="password"
                            class="edit-pass"
                        >
                            <el-button
                                type="primary"
                                size="medium"
                                @click="dialogVisible = true"
                                >修改密码</el-button
                            >
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
        <el-dialog
            :visible.sync="dialogVisible"
            title="修改密码"
            width="40%"
            @close="clear"
            @keyup.enter.native="submitPassEdit"
        >
            <div class="input-wa">
                <span>旧密码</span>
                <el-input
                    v-model="passwords.old"
                    type="password"
                    show-password
                ></el-input>
            </div>
            <div class="input-wa">
                <span>新密码</span
                ><el-input
                    v-model="passwords.thenew"
                    type="password"
                    show-password
                ></el-input>
            </div>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPassEdit"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { emailCheck, mobileCheck } from 'commonjs/utils';
import { updateBaseInfo, changePassword } from 'network/profile';
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
            },
            dialogVisible: false,
            passwords: {
                old: '',
                thenew: ''
            }
        };
    },
    methods: {
        reset() {
            this.$refs.form.resetFields();
        },
        clear() {
            this.passwords = {
                old: '',
                thenew: ''
            };
        },
        async submit() {
            const res = await updateBaseInfo(this.userdata);
            // console.log(res);
            
            if (res.status === 200) {
                this.$message.success('信息更新成功');
            }
            else{
                this.$message.error('信息更新失败');
                
            }
        },
        async submitPassEdit() {
            const { old, thenew } = this.passwords;
            if (old === '' || thenew === '')
                return this.$message.info('请输入旧密码和新密码');
            if (old !== this.userdata.password)
                return this.$message.error('旧密码错误');

            const res = await changePassword(thenew);
            if (res.status === 200) {
                this.$message.success('密码修改成功');
                this.dialogVisible = false;
                console.log('asdasd', this.dialogVisible);

                this.$store.commit('changePass', thenew);
            } else {
                this.$message.error('密码修改失败');
            }
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
    .edit-pass {
        // height:50px;
        margin-top: 5px;
        display: flex;
        align-content: center;
    }
    .input-wa {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        span {
            margin-right: 20px;
        }
        .el-input {
            width: 200px;
        }
    }
}
</style>
