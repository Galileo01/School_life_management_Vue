<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <!-- 搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            
            v-model="queryInfo.query"
            @keyup.enter.native="_getUsers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
             
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="adddialogVisible=true"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <users-table
        :users="users"
        @edit="edit"
        @delete="deleteFun"
        @allocate="allocate"
      ></users-table>
      <!--底部分页栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--添加用户 的对话框-->
    <add-dialog :dialogVisible.sync="adddialogVisible"></add-dialog>
    <edit-dialog
      :dialogVisible.sync="editdialogVisible"
      :id="oprateId"
     
    ></edit-dialog>
    <set-role-dialog
      :dialogVisible.sync="setdialogVisible"
      :user="settingUser"
     
    ></set-role-dialog>
  </div>
</template>

<script>
import UsersTable from "components/users/UsersTable";
import AddDialog from "components/users/AddDialog";
import EditDialog from "components/users/EditDialog";
import SetRoleDialog from "components/users/SetRoleDialog";
export default {
  name: "Users",
  data() {
    return {
      //  获取用户数据 的传入参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      //所有 用户
      users: [],
      //
      total: 0,
      adddialogVisible: false,
      editdialogVisible: false,
      oprateId: 0, //正在 编辑 的id ，传入 editDialog,
      setdialogVisible: false,
      settingUser: {}//正在 设置 角色的 id
    };
  },
  created() {
   
  },
  methods: {
    handleSizeChange(){},
    handleCurrentChange(){},
    getUsers(){
        this.users=[
            {
                username:'admin',
                id:222,
                wx:'1111111',
                mobile:'1233456t7',
                role:0,
                state:true,
            },
             {
                username:'sdasd',
                 id:123,
                wx:'222222',
                mobile:'1233456t7',
                role:1,
                state:true,
            },
             {
                username:'gddgfgd',
                 id:345,
                wx:'245245252',
                mobile:'1233456t7',
                role:0,
                state:true,
            },
             {
                username:'fhfghfgh',
                 id:5556,
                wx:'11114567573111',
                mobile:'1233456t7',
                role:1,
                state:true,
            },
             {
                username:'lllll',
                 id:888,
                wx:'1581111145646',
                mobile:'1233456t7',
                role:1,
                state:true,
            }

        ]
    },
    edit(id)
    {
        this.oprateId=id;
        this.editdialogVisible=true;
    },
    deleteFun(id){
        
    },
    allocate(id){
        this.setdialogVisible=true;
        this.editingId=id;
    }
  },
  created(){
      this.getUsers();
  },
  components: {
    UsersTable,
    AddDialog,
    EditDialog,
    SetRoleDialog
  }
};
</script>

<style>
</style>