<template>
    <div class="pro_sch">
        <BreadNav :texts="['数据管理', '省份学校']" />
        <el-card>
            <el-row>
                <el-col :span="4">
                    <el-select v-model="type" @change="getData" size="medium">
                        <el-option
                            v-for="(item, index) in listType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input
                        :placeholder="'请输入' + typeText"
                        @keyup.enter.native="find"
                        v-model="queryName"
                        @clear="reset"
                        clearable=""
                        size="medium"
                        ><el-button slot="append" @click="find"
                            >搜索</el-button
                        ></el-input
                    >
                </el-col>
<<<<<<< HEAD
                <el-col :span="6" :offset="2" v-if="$store.getters.userRole==='63'">
=======
                <el-col
                    :span="6"
                    :offset="2"
                    v-if="$store.getters.userRole === 63"
                >
>>>>>>> test
                    <el-button type="info" @click="addVisible = true"
                        >添加{{ typeText }}</el-button
                    >
                </el-col>
            </el-row>
            <PASTable
                :datalist="showlist"
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
                    <el-input
                        v-model="editInfo.name"
                        @keyup.enter.native="submitEdit"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="addVisible" :title="'添加' + typeText">
            <el-form label-width="70px">
                <el-form-item label="名称">
                    <el-input v-model="addInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="省份ID">
                    <el-input v-model="addInfo.provinceID"></el-input>
                </el-form-item>
                <el-form-item label="学校ID" v-show="type === 'university'">
                    <el-input v-model="addInfo.universityID"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getProvince,
    getSch,
    updatePro,
    updateSch,
    deletePro,
    deleteSch,
    addSch,
    addProvince,
} from 'network/prosch';
const PASTable = () => import('components/pro_sch/ListTable');
import { roleMixin } from 'commonjs/mixin';
export default {
    name: 'ProAndSch',
    mixins: [roleMixin],
    data() {
        return {
            tablelist: [],
            showlist: [],
            queryInfo: {
                page: 1,
                size: 10,
                total: 0,
            },
            queryName: '',
            type: 'province',
            listType: [
                {
                    value: 'province',
                    label: '省份',
                },
                { value: 'university', label: '学校' },
            ],
            editVisible: false,
            editInfo: {},
            addVisible: false,
            addInfo: {
                name: '',
                provinceID: 0,
                universityID: 0,
            },
        };
    },
    computed: {
        typeText() {
            if (this.type === 'province') return '省份';
            else return '学校';
        },
    },
    methods: {
        async getData() {
            let res = [];
            const { page, size } = this.queryInfo;
            switch (this.type) {
                case 'province':
                    res = await getProvince(page, size);
                    break;
                case 'university':
                    res = await getSch(page, size);
                    break;
            }
            console.log(res);

            if (res.status === 200) {
                this.tablelist = res.data.items;
                this.queryInfo.total = res.data.total;
                this.showlist = this.tablelist;
            } else {
                this.$message.error('列表数据获取失败');
            }
        },
        find() {
            if (!this.queryName) {
                this.showlist = this.tablelist;
                return this.$message.info(`请输入${this.typeText}名称`);
            }
            const filtered = this.tablelist.filter((val) =>
                val.name.includes(this.queryName)
            );
            if (filtered.length === 0) {
                this.$message.info(`未搜索到相关${this.typeText}`);
                // this.showlist = showlist;
            } else {
                this.showlist = filtered;
            }
        },
        reset() {
            this.showlist = this.tablelist;
        },
        edit(name) {
            this.editInfo = this.tablelist.find((val) => val.name === name);
            this.editVisible = true;
        },
        async remove(name) {
            if (this.userRole !== 63) return this.$message.error('权限不够');

            const obj = this.tablelist.find((val) => val.name === name);
            if (!obj)
                // 没找到 直接退出
                return;
            const result = await this.$confirm(
                `此操作将删除该${this.typeText}, 是否继续?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((error) => error);
            if (result === 'cancel') this.$message.info('操作取消');
            else {
                let res = {};
                switch (this.type) {
                    case 'province':
                        res = await deletePro(obj.provinceID);
                        break;
                    case 'university':
                        res = await deleteSch(obj.universityID);
                        break;
                }
                console.log(res);

                if (res.status === 200) {
                    this.$message.success(`成功删除该${this.typeText}`);
                    this.getData();
                } else {
                    this.$message.error('删除失败');
                }
            }
        },
        async submitEdit() {
            if (!this.editInfo) return;
            let res = [];
            const { name, provinceID, universityID } = this.editInfo;
            switch (this.type) {
                case 'university':
                    res = await updateSch(name, provinceID, universityID);
                    break;
                case 'province':
                    res = await updatePro(name, provinceID);
                    break;
            }
            if (res.status === 200) {
                this.$message.success(`${this.typeText}名称更新成功`);
                this.getData();
                this.editVisible = false;
            } else {
                this.$message.error(`${this.typeText}名称更新失败`);
            }
        },
        close() {
            this.editInfo = '';
        },
        handleSizeChange(size) {
            this.queryInfo.size = size;
            this.getData();
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page;
            this.getData();
        },
        async submitAdd() {
            const { name, provinceID, universityID } = this.addInfo;
            if (
                (this.type === 'province' &&
                    (name === '' || provinceID == 0)) ||
                (this.type === 'university' &&
                    (name == '' || provinceID == 0 || universityID === 0))
            )
                return this.$message.info('请确认信息是否填写完整');
            else {
                let res = {};
                switch (this.type) {
                    case 'province':
                        res = await addProvince({
                            name,
                            provinceID: parseInt(provinceID),
                        });
                        break;
                    case 'university':
                        res = await addSch({
                            name,
                            provinceID: parseInt(provinceID),
                            universityID: parseInt(universityID),
                        });
                        break;
                }
                if (res.status === 200) {
                    this.$message.success(`${this.type}添加成功`);
                    this.getData();
                } else {
                    this.$message.error(`${this.type}添加失败`);
                }
                this.addVisible = false;
            }
        },
        resetAdd() {
            this.addInfo = {
                name: '',
                provinceID: 0,
                universityID: 0,
            };
        },
    },
    created() {
        this.getData();
        // this.test();
    },
    components: {
        PASTable,
    },
};
</script>

<style></style>
