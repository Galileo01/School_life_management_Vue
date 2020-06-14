<template>
    <div class="users">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <BreadNav :texts="['用户管理', '用户列表']" />
        </el-breadcrumb>
        <el-card>
            <!-- 搜索-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="请输入用户名"
                        clearable
                        v-model="queryInfo.query"
                        @keyup.enter.native="_getUsers"
                        @clear="_getUsers('',1,0)"
                         size="medium"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="_getUsers"
                        ></el-button>
                    </el-input>
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
        <edit-dialog
            :dialogVisible.sync="editdialogVisible"
            :userdata="operatingUser"
            @updateSuccess="updateSuccess"
        ></edit-dialog>
    </div>
</template>

<script>
import UsersTable from 'components/users/UsersTable';
import EditDialog from 'components/users/EditDialog';
import { getUsers, addUser ,removeUser} from 'network/users';
export default {
    name: 'Users',
    data() {
        return {
            //  获取用户数据 的传入参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            //所有 用户
            users: [],
            //
            total: 0,
            editdialogVisible: false,
            setdialogVisible: false,
            operateID: 0 //将要 操作的 用户id
        };
    },
    computed: {
        operatingUser() {
            const temp = this.users.find(val => val.userID === this.operateID);
            return temp;
        }
    },
    methods: {
        handleSizeChange(size) {
            this.queryInfo.pagesize = size;
            this._getUsers();
        },
        handleCurrentChange(page) {
            this.queryInfo.pagenum = page;
            this._getUsers();
        },
        async _getUsers() {
            const res = await getUsers(
                this.queryInfo.query,
                this.queryInfo.pagenum,
                this.queryInfo.pagesize
            );
            console.log(res);
            if (res.status === 200) {
                const items = res.data.items;
                this.users = items.length > 0 ? items : this.users; //如果 获取的数据长度 不为空 才保存
                this.total = items.length > 0 ? res.data.total : this.total;
                if (items.length === 0 && this.queryInfo.query !== '')
                    this.$message.info('没有查找到对应名称的用户');
            } else {
                this.$message.error('用户列表失败');
            }
        },
        edit(id) {
            this.operateID = id;
            this.editdialogVisible = true;
        },
        async deleteFun({ role, id }) {
            console.log(id);

            if (this.userRole===3) {
                this.$message.error('你的权限太低');
                return;
            }
            const result = await this.$confirm(
                '此操作将删除该用户, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(error => error);

            if (result === 'cancel') this.$message.info('成功取消操作');
            else {
              const res=await removeUser(id);
              console.log(res);
              
              if(res.status===200)
                {
                      this.$message.success('成功删除用户');
                      this._getUsers();
                }
                else{
                    this.$message.error('用户删除失败'); //FIXME: 返回的数据 提示删除成功，但是 状态码确实500？
                    
                }
              
            }
        },
        allocate(id) {
            this.setdialogVisible = true;
            this.operateID = id;
        },
        updateSuccess(){
            this.editdialogVisible=false;
            thi._getUsers();
        }
    },
    created() {
        this._getUsers();
        // for(let i=0;i<20;i++)
        // {
        //     addUser(`user${i+17}`,i,i);
        // }
    },
    components: {
        UsersTable,
        EditDialog
    }
};
</script>

<style></style>
