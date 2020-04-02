<template>
    <div class="admin">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <BreadNav :texts="['用户管理','管理员列表']"/>
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
                    <el-button type="primary" @click="adddialogVisible = true"
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
        <add-dialog :dialogVisible.sync="adddialogVisible"></add-dialog>
        <edit-dialog
            :dialogVisible.sync="editdialogVisible"
            :userdata="operatingUser"
        ></edit-dialog>
        <set-role-dialog
            :dialogVisible.sync="setdialogVisible"
            :user="operatingUser"
        ></set-role-dialog>
    </div>
</template>

<script>
import UsersTable from 'components/admin/UsersTable';
import AddDialog from 'components/admin/AddDialog';
import EditDialog from 'components/admin/EditDialog';
import SetRoleDialog from 'components/admin/SetRoleDialog';
export default {
    name: 'Admin',
    data() {
        return {
            //  获取用户数据 的传入参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
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
            const temp = this.users.find(val => val.id === this.operateID);
            return temp;
        }
    },
    methods: {
        handleSizeChange() {},
        handleCurrentChange() {},
        getUsers() {
            this.users = [
                {
                    username: 'admin',
                    id: 222,
                    wx: '1111111',
                    mobile: '1233456t7',
                    role: 0,
                    state: true
                },
                {
                    username: 'sdasd',
                    id: 123,
                    wx: '222222',
                    mobile: '1233456t7',
                    role: 1,
                    state: true
                },
                {
                    username: 'gddgfgd',
                    id: 345,
                    wx: '245245252',
                    mobile: '1233456t7',
                    role: 1,
                    state: true
                },
                {
                    username: 'fhfghfgh',
                    id: 5556,
                    wx: '11114567573111',
                    mobile: '1233456t7',
                    role: 1,
                    state: true
                },
                {
                    username: 'lllll',
                    id: 888,
                    wx: '1581111145646',
                    mobile: '1233456t7',
                    role: 1,
                    state: true
                }
            ];
        },
        edit(id) {
            this.operateID = id;
            this.editdialogVisible = true;
        },
        async deleteFun({ role, id }) {
            console.log(id);

            if (role === 0 && this.UserRole > role) {
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
                const index = this.users.findIndex(val => val.id === id);
                this.users.splice(index, 1);
                this.$message.success('成功删除用户');
            }
        },
        allocate(id) {
            this.setdialogVisible = true;
            this.operateID = id;
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
