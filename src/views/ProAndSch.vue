<template>
    <div class="pro_sch">
        <BreadNav :texts="['数据管理', '省份学校']" />
        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-select v-model="type">
                        <el-option
                            v-for="(item, index) in listType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="getData"
                        >获取列表</el-button
                    >
                </el-col>
                <el-col :span="6">
                    <el-input
                        :placeholder="'请输入' + typeText"
                        @keyup.enter.native="find"
                        v-model="queryName"
                        @clear="reset"
                        clearable=""
                        ><el-button slot="append" @click="find"
                            >搜索</el-button
                        ></el-input
                    >
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-button type="primary" @click="showAddDialog"
                        >添加{{ typeText }}</el-button
                    >
                </el-col>
            </el-row>
            <PASTable
                :datalist="tablelist"
                :type="type"
                @edit="edit"
                @remove="remove"
            />
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryInfo.total"
            >
            </el-pagination>
        </el-card>
        <el-dialog :visible.sync="editVisible" title="修改信息" @close="close">
            <el-form>
                <el-form-item :label="typeText + '新名称'" label-width="90px">
                    <el-input v-model="newName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :visible.sync="addVisible"
            :title="'添加' + typeText"
            @close="close"
        >
            <el-form>
                <el-form-item
                    :label="'新' + typeText + '名称'"
                    label-width="90px"
                >
                    <el-input v-model="newData"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const PASTable = () => import('components/pro_sch/ListTable');
import { roleMixin } from 'commonjs/mixin';
export default {
    name: 'ProAndSch',
    mixins: [roleMixin],
    data() {
        return {
            tablelist: [],
            schools: [],
            provinces: [],
            queryInfo: {
                page: 0,
                size: 5,
                total: 0
            },
            queryName: '',
            type: 'province',
            listType: [
                {
                    value: 'province',
                    label: '省份'
                },
                { value: 'school', label: '学校' }
            ],
            editVisible: false,
            addVisible: false,
            newName: '',
            editID: -1,
            newData: ''
        };
    },
    computed: {
        typeText() {
            if (this.type === 'province') return '省份';
            else return '学校';
        },
        editingInfo() {
            if (this.editID === -1) return;
            this.tablelist.find();
        }
    },
    methods: {
        getProvinces() {
            const provinces = [
                {
                    id: 1,
                    name: '重庆市'
                },
                {
                    id: 2342,
                    name: '北京省'
                },
                {
                    id: 35,
                    name: '泸州市'
                },
                {
                    id: 6767,
                    name: '四川省'
                },
                {
                    id: 123,
                    name: '浙江省'
                }
            ];
            this.provinces = provinces;
            if (this.type === 'province') this.tablelist = provinces;
        },
        getSchool() {
            const schools = [
                {
                    id: 1233,
                    name: '重庆理工大学',
                    proID: 1
                },
                {
                    id: 999,
                    name: '重庆交通大学',
                    proID: 1
                },
                {
                    id: 444,
                    name: '重庆示范大学',
                    proID: 1
                },
                {
                    id: 66,
                    name: '重庆外国语大学',
                    proID: 1
                },
                {
                    id: 44,
                    name: '重庆工商大学',
                    proID: 1
                }
            ];
            this.schools = schools;
            if (this.type === 'school') this.tablelist = schools;
        },
        getData() {
            this.getProvinces();
            this.getSchool();
            this.queryInfo = {
                page: 1,
                size: 7,
                total: 30
            };
        },
        find() {
            if (!this.queryName)
                return this.$message.info(`请输入${this.typeText}名称`);
            const showlist = this[this.type + 's'];
            const filtered = showlist.filter(val =>
                val.name.includes(this.queryName)
            );
            if (filtered.length === 0) {
                this.$message.info(`未搜索到相关${this.typeText}`);
                this.tablelist = showlist;
            } else {
                this.tablelist = filtered;
            }
        },
        reset() {
            this.tablelist = this[this.type + 's'];
        },
        edit(id) {
            this.editID = id;
            this.editVisible = true;
        },
        async remove(id) {
            if (this.userRole !== 0) return this.$message.error('权限不够');

            this.editID = id;
            const result = await this.$confirm(
                `此操作将删除该${this.typeText}, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(error => error);
            if (result === 'cancel') this.$message.info('操作取消');
            else {
                this.$message.success(`成功删除该${this.typeText}`);
            }
        },
        submitEdit() {
            if (!this.newName) return;
            this.$message.success(`${this.typeText}信息更新成功`);
            this.editVisible = false;
        },
        submitAdd() {
            if (!this.newData) return;
            this.$message.success(`添加成功`);
            this.addVisible = false;
        },
        showAddDialog() {
            if (this.userRole !== 0) return this.$message.error('权限不够');
            this.addVisible = true;
        },
        close() {
            this.newName = '';
            this.newData = '';
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    },
    created() {
        this.getData();
    },
    components: {
        PASTable
    }
};
</script>

<style></style>
