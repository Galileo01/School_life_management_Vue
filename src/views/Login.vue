<template>
    <div class="login">
        <h1 class="title">便捷校园宝后台管理</h1>
        <div class="form-wapper">
            <div class="avator">
                <img src="~assets/img/logo.png" alt="" />
            </div>

            <el-form
                :model="formData"
                ref="form"
                :rules="rules"
                @keyup.enter.native="login"
            >
                <el-form-item prop="username">
                    <el-input
                        v-model="formData.username"
                        placeholder="用户名"
                        clearable
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="formData.password"
                        placeholder="密码"
                        clearable
                        prefix-icon="el-icon-lock"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="identify">
                    <div class="identify-wapper">
                        <el-input
                            class="identify-input"
                            placeholder="输入验证码"
                            v-model="formData.identify"
                        ></el-input>
                        <s-identify
                            :contentWidth="150"
                            :contentHeight="40"
                            class="idfentify"
                            :identifyCode="identifyCode"
                            @click.native="generateIdentify"
                        ></s-identify>
                    </div>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { log } from 'util';
import SIdentify from 'components/com/identify';
import {loginReq} from 'network/login'
export default {
    name: 'Login',
    data() {
        return {
            formData: {
                username: '',
                password: '',
                identify: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 15,
                        message: '长度在 3 到 15 个字符',
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
                identify: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            identifyCode: '1234' // 验证码
        };
    },
    methods: {
        reset() {
            this.$refs.form.resetFields();
        },
        login() {
            this.$refs.form.validate(async  valid => {
                if (valid) {
                    //基本验证 通过
                    if (this.identifyCode === this.formData.identify) {
                        // //验证码 正确
                    const res= await loginReq(this.formData.username,this.formData.password);
                    console.log(res);
                    if(res.status===200)
                    {
                            window.localStorage.setItem(
                                'token',
                                res.data.token
                            );
                            const {account,tel,email,qq,wechat,Role}=res.data;
                            this.$store.commit('getUserdata',{
                                    account,tel,email,qq,wechat,Role
                            });
                            sessionStorage.setItem(
                                'user',
                                {
                                   account
                                }
                            );
                             this.$router.push('/home');
                            this.$message.success('登录成功');
                    }
                    else{
                        this.$message.error('用户名或密码错误');
                        
                    }
                    
                        // if (this.formData.password === '123456') {
                        //     // 验证成功
                        //     window.localStorage.setItem(
                        //         'token',
                        //         this.identifyCode
                        //     ); // 模拟设置 token

                        //     const admin = {
                        //         account: this.formData.username,
                        //         admin_id: this.identifyCode + '',
                        //         token: this.identifyCode,
                        //         Role: this.formData.username === 'admin' ? 0 : 1,
                        //         tel:'123131313331',
                        //         qq:'14545432546',
                        //         wechat:'sdasdasdasd',
                        //         avatar:'https://note.youdao.com/yws/api/image/normal/1576755416467?userId=1354541676%40qq.com'
                        //     };
                        //     this.$store.commit('getUserdata',admin);
                        //     sessionStorage.setItem(
                        //         'user',
                        //         JSON.stringify({
                        //             username: 'admin',
                        //             id: '1234'
                        //         })
                        //     );
                        //     this.$router.push('/home');
                        //     this.$message.success('登录成功');
                        // } else {
                        //     this.$message.error('用户名或密码错误');
                        // }
                    } else {
                        this.$message.error('验证码错误');
                        this.formData.identify = '';
                        this.generateIdentify();
                    }
                }
            });
        },
        generateIdentify() {
            let count = 1;
            let code = '';
            while (count <= 4) {
                const num = Math.floor(Math.random() * 10);
                code += num;
                count++;
            }
            this.identifyCode = code;
        },
        // 检测已有的token  ，自动登录
        autoLogin() {
            if (localStorage.getItem('token')) {
                //本地存有 token
                //发送自动登录请求，若 token 没有过期 就自动进入 进入首页,并保存 传回的 用户信息

                this.$message.success('自动登录');
                this.$router.push('/home');
                const admin = {
                                account: this.formData.username,
                                admin_id: this.identifyCode + '',
                                token: this.identifyCode,
                                Role: this.formData.username === 'admin' ? 0 : 1,
                                tel:'123131313331',
                                qq:'14545432546',
                                wechat:'sdasdasdasd',
                                avatar:'https://note.youdao.com/yws/api/image/normal/1576755416467?userId=1354541676%40qq.com'
                            };
                            this.$store.commit('getUserdata',admin);
            } else {
                //随机生成 数字 验证码
                this.generateIdentify();
            }
        }
    },
    created() {
        //随机生成 数字 验证码
        this.autoLogin();;
    },
    components: {
        's-identify': SIdentify
    }
};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #2b4b6b;
}
.form-wapper {
    height: 330px;
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
}
.el-form {
    margin-top: 90px;
    padding: 0 10px;
    .btns {
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
    }
}
.avator {
    position: absolute;
    top: -60px;
    background-color: #fff;
    border-radius: 50%;
    padding: 5px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px #ddd;
    img {
        height: 120px;
        width: 120px;
        border-radius: 50%;
    }
}
h1.title {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%);
    color: #fff;
}

.identify-wapper {
    display: flex;
    justify-content: space-between;
    .identify-input {
        width: 140px;
    }
}
</style>
