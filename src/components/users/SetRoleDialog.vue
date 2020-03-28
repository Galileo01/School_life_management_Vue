<template>
  <el-dialog
    title="分配角色"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
   
  >
    <div>
      <p>用户名称 ：{{user.username}}</p>
      <p>用户角色 ：{{user.role_name}}</p>
      分配的新角色<el-select
        v-model="selectedId"
        placeholder="请选择"
      >
        <el-option
          v-for="item in roleslist"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
     
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "SetRoleDialog",
  data() {
    return {
      roleslist: [],
      selectedId: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    user: Object
  },
  methods: {
    async _uploadSet() {
     
    },
    async _getRoleslist() {}
      
  },
  created() {
    //获取所有 角色列表
    this._getRoleslist();
  }
};
</script>

<style scoped>
.el-select{
  margin-left: 10px;
}
</style>