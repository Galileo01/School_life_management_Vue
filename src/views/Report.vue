<template>
    <div class="report">
        <BreadNav :texts="['数据管理', '数据报表']" />
        <el-card>
            <el-tabs v-model="activeName" tab-position="left">
                <el-tab-pane label="数据统计" name="tongji">
                    <div class="tongji">
                        <div class="users">
                            <h3>用户数据</h3>
                            <p>系统用户总数:<span>50</span></p>
                            <p>
                                今日用户新增数目:<span>{{
                                    totalData.todayUSers
                                }}</span>
                            </p>
                        </div>
                        <div class="orders">
                            <h3>订单数据</h3>
                            <p>订单总数:<span>100</span></p>
                            <p>
                                今日订单新增数目:<span>{{
                                    totalData.todayOrders
                                }}</span>
                            </p>
                            <div>
                                <div class="selects">
                                    <el-row>
                                        <el-col :span="10"
                                            ><el-tag size="medium"
                                                >选择时间范围</el-tag
                                            ></el-col
                                        >
                                        <el-col :span="6"
                                            ><el-select
                                                size="mini"
                                                v-model="query.dataTime"
                                                @change="changeTongjiData"
                                            >
                                                <el-option
                                                    label="今天"
                                                    value="today"
                                                ></el-option>

                                                <el-option
                                                    label="总数"
                                                    value="total"
                                                ></el-option> </el-select
                                        ></el-col>
                                    </el-row>
                                </div>
                                <div class="charts">
                                    <div id="bar"></div>
                                    <div id="pie"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据变化" name="bianhua">
                    <div class="bianhua">
                        <div class="users">
                            <h3>用户变化</h3>
                            <el-tag size="medium" type="info"
                                >近7天新增用户变化如下</el-tag
                            >
                            <div id="line"></div>
                        </div>
                        <div class="orders">
                            <h3>订单变化</h3>
                            <el-tag type="info" size="medium"
                                >最近7天订单变化如下</el-tag
                            >
                            <div class="selects">
                                <el-row>
                                    <el-col :span="10"
                                        ><el-tag size="medium"
                                            >选择订单</el-tag
                                        ></el-col
                                    >
                                    <el-col :span="10"
                                        ><el-select
                                            size="mini"
                                            v-model="query.orderType"
                                            @change="changeBianhuaData"
                                        >
                                            <el-option
                                                label="帮帮贴"
                                                value="help"
                                            ></el-option>
                                            <el-option
                                                label="二手"
                                                value="secondary"
                                            ></el-option>
                                            <el-option
                                                label="失物招领"
                                                value="lost"
                                            ></el-option>
                                            <el-option
                                                label="兼职"
                                                value="partTime"
                                            ></el-option></el-select
                                    ></el-col>
                                </el-row>
                            </div>
                            <div id="line2"></div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { getDailyData, getCurrentData } from 'network/report';
import { getHelp, getLost, getPartime, getSec } from 'network/order';
import { getUsers } from 'network/users';
export default {
    name: 'Report',
    data() {
        return {
            total: {},
            activeName: 'tongji',
            query: {
                dataTime: 'total',
                orderType: 'help',
            },

            orderlineDatas: {}, //所有数据

            pieDatas: {},
            barDatas: {},
            totalData: {
                totalUsers: 0,
                todayUSers: 0,
                totalOrders: 0,
                todayOrders: 0,
            },
            barChart: {},
            pieChart: {},
            lineChart: {},
            lineChart2: {},
        };
    },
    methods: {
        async getData() {
            const res = await getDailyData();
            console.log(res);
            if (res.status !== 200) return this.$message.error('数据获取失败');
            if (res.message === '登录已过期') {
                localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
                this.$message.error('登录已过期');
            }
            //计算今天的统计数据
            //柱形 数据
            let tHelpNum = 0,
                tLostNum = 0,
                tSecNum = 0,
                tPartNum = 0;
            let tTotal = 0;
            let tUsers = 0;

            //变化曲线 数据
            let BHelpNum = 0,
                BLostNum = 0,
                BSecNum = 0,
                BPartNum = 0;
            let BUsers = 0;

            const Userarr = [0, 0, 0, 0, 0, 0, 0]; //数据记录
            const Helparr = [0, 0, 0, 0, 0, 0, 0];
            const Lostarr = [0, 0, 0, 0, 0, 0, 0];
            const Secarr = [0, 0, 0, 0, 0, 0, 0];
            const Partarr = [0, 0, 0, 0, 0, 0, 0];

            const month = new Date().getMonth(); //记录 今天
            const day = new Date().getDate();
            const Time = new Date().getTime();
            for (const val of res.data.items) {
                const {
                    CreatedAt,
                    helpPost,
                    lostFound,
                    partTime,
                    secondaryPost,
                    users,
                } = val;
                const record = new Date(CreatedAt);
                if (record.getDate() === day && record.getMonth() === month) {
                    //如果是今天的数据
                    tHelpNum += parseInt(helpPost);
                    tLostNum += parseInt(lostFound);
                    tPartNum += parseInt(partTime);
                    tSecNum += parseInt(secondaryPost);
                    tUsers += parseInt(users);
                    tTotal +=
                        parseInt(helpPost) +
                        parseInt(lostFound) +
                        parseInt(partTime) +
                        parseInt(secondaryPost);
                }
                const distance = Math.floor(
                    (Time - record.getTime()) / (24 * 60 * 60 * 1000)
                ); //获得相距 的 天数
                if (distance <= 6) {
                    //如果距离小于 6天
                    Userarr[6 - distance] += parseInt(users);
                    Lostarr[6 - distance] += parseInt(lostFound);
                    Helparr[6 - distance] += parseInt(helpPost);
                    Secarr[6 - distance] += parseInt(secondaryPost);
                    Partarr[6 - distance] += parseInt(partTime);
                }
            }
            // console.log(tHelpNum, tLostNum, tSecNum, tPartNum, tTotal);
            // console.log(Userarr, Lostarr, Helparr, Secarr, Partarr);
            // this.orderlineDatas = {
            //     help: Helparr,
            //     lost: Lostarr,
            //     secondary: Secarr,
            //     partTime: Partarr,
            // };
            this.orderlineDatas = {
                help: [20, 30, 44, 66, 77, 77, 33],
                lost: [0, 0, 4, 6, 7, 7, 3],
                secondary: [203, 303, 442, 664, 774, 774, 343],
                partTime: [20, 30, 44, 66, 77, 77, 33],
            };
            this.userLineData = Userarr;
            //保存 今日数据
            // this.totalData.todayUSers = tUsers ;
            // this.totalData.todayOrders = tTotal;

            //测试数据
            this.totalData.todayUSers = tUsers + 20;
            this.totalData.todayOrders = tTotal + 50;
            // this.pieDatas.today = [
            //     { name: '帮帮贴', value: tHelpNum },
            //     { name: '二手市场', value: tSecNum },
            //     { name: '兼职', value: tPartNum },
            //     { name: '失物招领', value: tLostNum },
            // ];

            //测试
            this.pieDatas.today = [
                { name: '帮帮贴', value: 25 },
                { name: '二手市场', value: 18 },
                { name: '兼职', value: 20 },
                { name: '失物招领', value: 10 },
            ];
            this.barDatas.today = [
                tHelpNum + 25,
                tSecNum + 18,
                tPartNum + 20,
                tLostNum + 10,
            ];
            //计算总体数据
            //饼图 数据
            let THelpNum = 0,
                TLostNum = 0,
                TSecNum = 0,
                TPartNum = 0;
            let TTotal = 0;
            let TUsers = 0;
            //获取 系统 总订单数目
            Promise.all([
                getHelp(1, 9999),
                getLost(1, 9999),
                getPartime(1, 9999),
                getSec(1, 9999),
                getUsers('', 1, 9999),
            ]).then((res) => {
                // console.log(res);
                for (let i = 0; i < 4; i++) {
                    if (res[i].status === 200) {
                        TTotal += res[i].data.total;
                    }
                }
                THelpNum = res[0].status === 200 ? res[0].data.total : 0;
                TLostNum = res[1].status === 200 ? res[1].data.total : 0;
                TSecNum = res[3].status === 200 ? res[3].data.total : 0;
                TPartNum = res[2].status === 200 ? res[2].data.total : 0;
                TUsers = res[4].status === 200 ? res[4].data.total : 0;
                // console.log(
                //     THelpNum,
                //     TLostNum,
                //     TSecNum,
                //     TPartNum,
                //     TTotal,
                //     TUsers
                // );
                //保存数据
                this.pieDatas.total = [
                    { name: '帮帮贴', value: 25 + THelpNum },
                    { name: '二手市场', value: 18 + TSecNum },
                    { name: '兼职', value: 20 + TPartNum },
                    { name: '失物招领', value: 10 + TLostNum },
                ];
                this.barDatas.total = [THelpNum, TSecNum, TPartNum, TLostNum];
                this.changeTongjiData();
                this.setUserBianhua();
                this.changeBianhuaData();
            });
        },
        //准备 chart 绘制的 配置
        prepareDraw() {
            {
                //  console.log(document.querySelector('#pie'));
                this.lineChart = echarts.init(document.querySelector('#line'));
                this.lineChart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: [
                            '第1天',
                            '第2天',
                            '第3天',
                            '第4天',
                            '第5天',
                            '第6天',
                            '第7天',
                        ],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '用户新增数量',
                            type: 'line',
                            data: [],
                        },
                    ],
                });
                this.lineChart2 = echarts.init(
                    document.querySelector('#line2')
                );
                this.lineChart2.setOption({
                    tooltip: {},
                    xAxis: {
                        data: [
                            '第1天',
                            '第2天',
                            '第3天',
                            '第4天',
                            '第5天',
                            '第6天',
                            '第7天',
                        ],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '订单新增数量',
                            type: 'line',
                            data: [],
                        },
                    ],
                });

                this.pieChart = echarts.init(document.querySelector('#pie'));
                this.pieChart.setOption({
                    title: {
                        text: '4种订单占比',
                    },
                    tooltip: {},
                    series: [
                        {
                            name: '比例',
                            type: 'pie',
                            radius: '90%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data: [],
                        },
                    ],
                });
                this.barChart = echarts.init(document.querySelector('#bar'));

                this.barChart.setOption({
                    title: {
                        text: '4种订单数量',
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['帮帮贴', '二手', '兼职', '失物招领'],
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            data: [],
                        },
                    ],
                });
            }
        },
        changeTongjiData() {
            console.log(this.query.dataTime);

            this.pieChart.setOption({
                series: [
                    {
                        name: '比例',
                        data: this.pieDatas[this.query.dataTime],
                    },
                ],
            });
            this.barChart.setOption({
                series: [
                    {
                        name: '数量',
                        data: this.barDatas[this.query.dataTime],
                    },
                ],
            });
        },
        setUserBianhua() {
            this.lineChart.setOption({
                series: [
                    {
                        name: '用户新增数量',
                        type: 'line',
                        data: this.userLineData,
                    },
                ],
            });
        },
        changeBianhuaData() {
            console.log(this.query.orderType);
            console.log(this.orderlineDatas[this.query.orderType]);

            this.lineChart2.setOption({
                series: [
                    {
                        name: '订单新增数量',
                        type: 'line',
                        data: this.orderlineDatas[this.query.orderType],
                    },
                ],
            });
        },
    },
    created() {
        this.getData();
    },
    mounted() {
        this.$nextTick(this.prepareDraw()); //准备 dom 元素
    },
};
</script>

<style scoped lang="less">
.report {
    /deep/ .el-card__body {
        padding: 10px;
        .general {
            div {
                font-size: 14px;
                margin-bottom: 5px;
            }
        }
        .el-row {
            margin-bottom: 5px;
        }
        .selects {
            margin-bottom: 20px;
            margin-top: 10px;
            display: flex;
        }
    }
    .el-tabs {
        p,
        span {
            font-size: 13px;
        }
        .charts {
            display: flex;
        }
        .bianhua {
            display: flex;
            .selects {
                margin-bottom: 0px;
            }
        }
    }

    #line,
    #pie,
    #bar,
    #line2 {
        width: 600px;
        height: 300px;
    }
    #line {
        margin-top: 45px;
    }
}
</style>
