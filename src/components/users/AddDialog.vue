<template>
  <el-dialog
    title="添加用户"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
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
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="newUser.username"></el-input>

      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="newUser.password"></el-input>

      </el-form-item>
      <el-form-item
        label="微信"
        prop="wx"
      >
        <el-input v-model="newUser.wx"></el-input>

      </el-form-item>
      <el-form-item
        label="电话"
        prop="mobile"
      >
        <el-input v-model="newUser.mobile"></el-input>

      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { emailCheck, mobileCheck } from "commonjs/utils";
export default {
  name: "AddDialog",
  data() {
  
    return {
      newUser: {
        username: "",
        password: "",
        wx: "",
        mobile: ""
      },
      addFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        //邮箱和 电话使用自定义的 验证规则
        wx: [
          { required: true, message: "请输入微信", trigger: "blur" },
          
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            validator: mobileCheck,
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    dialogVisible: Boolean
  },methods:{
     submit(){
        this.$refs.form.validate(valid=>{
          if(!valid)
          return ;
          else {
            this.$message.success('成功添加用户');
            this.$emit('update:dialogVisible',false);
          }
        })
       
     },
     clear(){
       this.$refs.form.resetFields();
     }
  }
};
</script>

<style>
</style>