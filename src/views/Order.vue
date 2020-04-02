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
                <el-col :span="6">
                    <el-button type="primary">获取列表</el-button>
                </el-col>
            </el-row>
            <OrderTable :orderlist="orderlist" />
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
            listType: 'lostFound',
            orderlist: []
        };
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
                    contact: '15745632807'
                },
                {
                    orderID: 555,
                    userID: 54,
                    title: '失物失物03',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                },
                {
                    orderID: 656,
                    userID: 444,
                    title: '失物失物fff',
                    ge_time: '2019-07-14',
                    type: 'help',
                    contact: '15745632807'
                },
                {
                    orderID: 678,
                    userID: 134,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                },
                {
                    orderID: 999,
                    userID: 78,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                },
                {
                    orderID: 274,
                    userID: 1659,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                },
                {
                    orderID: 159,
                    userID: 157,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                },
                {
                    orderID: 4456,
                    userID: 223242342,
                    title: '失物失物招领',
                    ge_time: '2019-07-14',
                    type: 'lostFound',
                    contact: '15745632807'
                }
            ];
            this.queryInfo={ page: 0,
                size: 5,
                total: 25}
        },
         handleSizeChange() {},
        handleCurrentChange() {},
    },
    created() {
        this.getData();
    },
    components: {
        OrderTable
    }
};
</script>

<style></style>
