<template>
    <div class="order">
        <BreadNav :texts="['订单管理', '订单列表']" />
        <el-card>
            <el-row>
                <el-col :span="4"
                    ><el-select v-model="listType" @change="getData">
                        <el-option
                            v-for="(item, index) in typelist"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> </el-select
                ></el-col>
                <el-col :span="4">
                    <el-button type="primary">获取列表</el-button>
                </el-col>
                <el-col :span="4">
                    <el-input
                        placeholder="请输入订单标题"
                        v-model="queryTitle"
                        clearable
                        @keyup.enter.native="find"
                        @clear="reset"
                        ><el-button slot="append" @click="find"
                            >搜索</el-button
                        ></el-input
                    >
                </el-col>
            </el-row>
            <OrderTable
                :orderlist="showOrderlist"
                @showmore="showMore"
                :type="listType"
                @remove="deleteFun"
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
        <el-dialog
            :visible.sync="detailVisible"
            title="订单详情"
            v-if="detailID !== -1"
        >
            <el-row
                ><el-col :span="4">订单标题</el-col>
                <el-col :span="8">{{ detailInfo.title }}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">用户名</el-col>
                <el-col :span="8">{{ getdetailUSer() }}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">订单类型</el-col>
                <el-col :span="8">{{ typeText }}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">订单内容</el-col>
                <el-col :span="20">{{ detailInfo.content }}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">标签</el-col>
                <el-col :span="20"
                    ><el-tag
                        v-for="(item, index) in detailInfo.tag"
                        :key="index"
                        >{{ item }}</el-tag
                    ></el-col
                ></el-row
            >
            <el-row v-if="detailInfo.price"
                ><el-col :span="4">订单价格</el-col>
                <el-col :span="20">￥{{ detailInfo.price }}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">订单备注</el-col>
                <el-col :span="20">{{
                    detailInfo.commont | comment
                }}</el-col></el-row
            >
        </el-dialog>
    </div>
</template>

<script>
import OrderTable from 'components/order/OrderTable';
import { addHelp, addLost, addPartTime, addSec } from 'network/order.js';
import {
    getHelp,
    getLost,
    getPartime,
    getSec,
    deleteHelp,
    deleteLost,
    deletePart,
    deleteSec
} from 'network/order.js';
export default {
    name: 'Order',
    data() {
        return {
            typelist: [
                {
                    value: 'lostFound',
                    label: '失物招领'
                },
                { value: 'help', label: '帮帮贴' },
                { value: 'partTime', label: '兼职' },
                { value: 'secondary', label: '二手' }
            ],
            queryInfo: {
                page: 1,
                size: 10,
                total: 0
            },
            queryTitle: '',

            listType: 'lostFound', //默认失物招领
            orderlist: [], //  某一类型的总列表
            showOrderlist: [], //根据 搜索title 过滤的列表
            detailVisible: false,
            detailID: -1
        };
    },
    filters: {
        comment(val) {
            return val ? val : '无';
        }
    },
    computed: {
        detailInfo() {
            if (this.detailID === -1) return;
            return this.showOrderlist.find(val => val.orderID == this.detailID);
        },
        typeText() {
            switch (this.listType) {
                case 'lostFound':
                    return '失物招领';
                case 'help':
                    return '帮帮贴';
                case 'partTime':
                    return '兼职';
                case 'secondary':
                    return '二手';
            }
        }
    },
    methods: {
        async getData() {
            let res = [];
            const { page, size } = this.queryInfo;
            switch (this.listType) {
                case 'lostFound':
                    res = await getLost(page, size);
                    break;
                case 'help':
                    res = await getHelp(page, size);
                    break;
                case 'partTime':
                    res = await getPartime(page, size);
                    break;
                case 'secondary':
                    res = await getSec(page, size);
                    break;
            }
            console.log(res);

            if (res.status === 200) {
                this.orderlist = res.data.items;
                this.queryInfo.total = res.data.total;
            } else {
                this.$message.error('订单获取失败');
                return;
            }

            //过滤 包含 queryTitle字符串的 订单
            this.showOrderlist =
                this.queryTitle === ''
                    ? this.orderlist
                    : this.orderlist.filters(val =>
                          val.title.includes(this.queryTitle)
                      );
        },
        find() {
            if (!this.queryTitle) {
                this.$message.info('请输入订单标题');
                return;
            }
            const filtered = this.orderlist.filter(val =>
                val.title.includes(this.queryTitle)
            );
            if (filtered.length === 0) {
                this.$message.info('没有找到相关订单');
                this.showOrderlist = this.orderlist;
            } else {
                this.showOrderlist = filtered;
            }
        },
        reset() {
            this.showOrderlist = this.orderlist;
        },
        showMore(id) {
            this.detailID = id;
            this.detailVisible = true;
        },
        getdetailUSer() {
            return 'ltt';
        },
        handleSizeChange(size) {
            this.queryInfo.size = size;
            this.getData();
            console.log(size);
        },
        handleCurrentChange(page) {
            this.queryInfo.page = page;
            this.getData();
            console.log(page);
        },
        async deleteFun(id) {
            const result = await this.$confirm(
                '此操作将删除该订单, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(error => error);

            if (result === 'cancel') {
                this.$message.info('操作取消');
            } else {
                let res = [];
                switch (this.listType) {
                    case 'lostFound':
                        res = await deleteLost(id);
                        break;
                    case 'help':
                        res = await deleteHelp(id);
                        break;
                    case 'partTime':
                        res = await deletePart(id);
                        break;
                    case 'secondary':
                        res = await deleteSec(id);
                        break;
                }
                if (res.status === 200) {
                    this.$message.success('订单成功删除');
                    this.getData();
                } else {
                    this.$message.error('订单删除失败');
                }
            }
        },
        async test() {
            const Tel = '2222333333';
            const content = '二手二手';
            const tag = 'help';
            const title = '这是二手二手';
            const userID = 34;

            for (let i = 0; i < 20; i++) {
                const params = {
                    TEL: Tel + i,
                    content: content + i,
                    tag: [tag + i],
                    title: title + i,
                    userID: userID + i * 3 + '',
                    note: 'note' + i,
                    picture: ['picture' + i],
                    userName: userID + i * 3 + '',
                    price: 66.66
                };
                const res = await addSec(params);
                console.log(res);
            }
        }
    },
    created() {
        this.getData();
    },
    components: {
        OrderTable
    }
};
</script>

<style scoped lang="less">
.el-dialog {
    .el-row {
        margin-bottom: 40px;
    }
}
</style>
