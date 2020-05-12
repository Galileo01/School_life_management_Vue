<template>
    <div class="admin">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <BreadNav :texts="['用户管理', '管理员列表']" />
        </el-breadcrumb>
        <el-card>
            <!-- 搜索-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input
                        placeholder="请输入内容"
                        clearable
                        v-model="queryInfo.query"
                        @keyup.enter.native="getUsers"
                        @clear="getUsers"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUsers"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4" v-if="userRole=='63'">
                    <el-button type="primary" @click="addClick"
                        >添加管理员</el-button
                    >
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
        <add-dialog
            :dialogVisible.sync="adddialogVisible"
            @addsuccess="addsuccess"
        ></add-dialog>
        <edit-dialog
            :dialogVisible.sync="editdialogVisible"
            :userdata="operatingUser"
            @editSuccess="editSuccess"
        ></edit-dialog>
        <set-role-dialog
            :dialogVisible.sync="setdialogVisible"
            :user="operatingUser"
            @allocateSuccess="allocateSuccess"
        ></set-role-dialog>
    </div>
</template>

<script>
import UsersTable from 'components/admin/UsersTable';
import AddDialog from 'components/admin/AddDialog';
import EditDialog from 'components/admin/EditDialog';
import SetRoleDialog from 'components/admin/SetRoleDialog';
import { getAdmin, removeAdmin } from 'network/admin';
import { roleMixin } from 'commonjs/mixin';
export default {
    name: 'Admin',
    mixins: [roleMixin],
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
            adddialogVisible: false,
            editdialogVisible: false,
            setdialogVisible: false,
            operateID: 0 //将要 操作的 用户id
        };
    },
    computed: {
        operatingUser() {
            if (this.users.length === 0) return;
            const temp = this.users.find(val => val.ID === this.operateID);
            return temp;
        }
    },
    methods: {
        handleSizeChange(size) {
            this.queryInfo.pagesize = size;
            this.getUsers();
        },
        handleCurrentChange(page) {
            // console.log(page);

            this.queryInfo.pagenum = page;
            this.getUsers();
        },
        async getUsers() {
            const res = await getAdmin(
                this.queryInfo.query,
                this.queryInfo.pagenum,
                this.queryInfo.pagesize
            );
            console.log(res);

            if (res.status === 200) {
                const items = res.data.items;
                this.users = items.length > 0 ? items : this.users; //如果 获取的数据长度 不为空
                this.total = items.length > 0 ? res.data.total : this.total;
                if(items.length===0&&this.queryInfo.query!=='')
                this.$message.info('没有查找到对应名称的管理员');
                
            }
        },
        edit(id) {
            this.operateID = id;
            this.editdialogVisible = true;
        },
        //MARK: 删除 管理员报错
        async deleteFun(account) {
            // console.log(account);

            if (account === 'superadmin' || this.userRole !== 63) {
                this.$message.error('无法删除系统管理员，你的权限太低');
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
                const res = await removeAdmin(account);
                if (res.status === 200) {
                    this.$message.success('成功删除管理员');
                    this.getUsers();
                } else {
                    this.$message.error('管理员删除失败');
                }
            }
        },
        allocate(id) {
            this.setdialogVisible = true;
            this.operateID = id;
            console.log(id);
        },
        addsuccess() {
            this.adddialogVisible = false;
            this.getUsers();
        },
        editSuccess() {
            this.editdialogVisible = false;
            this.getUsers();
        },
        allocateSuccess() {
            this.setdialogVisible = fasle;
            this.getUsers();
        },
        addClick() {
            if (this.userRole !== 63) {
                this.$message.error('无法新建管理员，你的权限太低');
                return;
            }
            this.adddialogVisible = true;
        }
    },
    created() {
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

<style></style>
