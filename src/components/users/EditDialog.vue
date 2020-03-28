<template>
  <el-dialog
    title="编辑用户信息"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="600px"
  
  >
    <el-form
      :model="userdata"
      :rules="editFormRules"
      ref="editForm"
    >
      <el-form-item
        label="用户名"
        label-width="70px"
      >
        <el-input
          v-model="userdata.username"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        label-width="70px"
        prop="email"
      >
        <el-input v-model="userdata.email"></el-input>
      </el-form-item>
      <el-form-item
        label="电话"
        label-width="70px"
        prop="mobile"
      >
        <el-input v-model="userdata.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
      
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { emailCheck, mobileCheck } from "commonjs/utils";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean,
    id: Number
  },
  data() {
    return {
      userdata: {
        username: "",
        email: "",
        mobile: ""
      },
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: emailCheck,
            trigger: "blur"
          }
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
  methods: {
    
  }
};
</script>

<style>
</style>