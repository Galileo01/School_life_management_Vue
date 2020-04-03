<template>
    <div class="order">
        <BreadNav :texts="['订单管理', '订单列表']" />
        <el-card>
            <el-row>
                <el-col :span="4"
                    ><el-select v-model="listType">
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
                :type="typeText"
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
                <el-col :span="8">{{getdetailUSer()}}</el-col></el-row
            >
            <el-row
                ><el-col :span="4">订单类型</el-col>
                <el-col :span="8">{{typeText}}</el-col></el-row
            >
            <el-row><el-col :span="4">订单内容</el-col> <el-col :span="20">{{detailInfo.content}}</el-col></el-row>
            <el-row><el-col :span="4">订单备注</el-col> <el-col :span="20">{{detailInfo.commont|comment}}</el-col></el-row>
        </el-dialog>
    </div>
</template>

<script>
import OrderTable from 'components/order/OrderTable';
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
                { value: 'second', label: '二手' }
            ],
            queryInfo: {
                page: 0,
                size: 5,
                total: 0
            },
            queryTitle: '',

            listType: 'lostFound',
            orderlist: [], //  某一类型的总列表
            showOrderlist: [], //根据 搜索title 过滤的列表
            detailVisible: false,
            detailID: -1
        };
    },
    filters:{
        comment(val){
            return val?val:'无';
        }
    },
    computed: {
        detailInfo() {
            if (this.detailID === -1) return;
            return this.showOrderlist.find(val => val.orderID == this.detailID);
        },
        typeText(){
             switch (this.listType) {
                case 'lostFound':
                    return '失物招领';
                case 'help':
                    return '帮帮贴';
                case 'partTime':
                    return '兼职';
                case 'second':
                    return '二手';
            }
            }
    },
    methods: {
        getData() {
            this.orderlist = [
                {
                    orderID: 123,
                    userID: 222,
                    title: '失物失物01',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807',
                    content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 555,
                    userID: 54,
                    title: '失物失物03',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807',
                     content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 656,
                    userID: 444,
                    title: '失物失物fff',
                    ge_time: '2019-07-14',
                    type: 'help',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 678,
                    userID: 134,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 999,
                    userID: 78,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 274,
                    userID: 1659,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 159,
                    userID: 157,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                },
                {
                    orderID: 4456,
                    userID: 223242342,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807', content:'4月1日，在美国首都华盛顿，一名男子在华盛顿纪念碑附近跑步。根据美国约翰斯·霍普金斯大学最新数据，截至当地时间4月1日22时（北京时间4月2日10时），美国新冠肺炎确诊病例已超21.3万例，死亡病例超过4700例。'
                }
            ];
            this.showOrderlist = this.orderlist;
            this.queryInfo = { page: 0, size: 5, total: 25 };
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
        getdetailUSer(){
            return 'ltt';
        },
        handleSizeChange() {},
        handleCurrentChange() {}
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
