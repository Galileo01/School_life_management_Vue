<template>
    <el-table border stripe :data="orderlist" v-if="Object.keys(orderlist).length!==0" size="small">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" :prop="orderID"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="发布用户" prop="userName"></el-table-column>
        <el-table-column label="联系方式" prop="TEL"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="180px">
            <template v-slot="{ row }">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="$emit('remove',row[orderID])"
                    size="mini"
                ></el-button>
                <el-tooltip  content="查看更多信息" placement="top" effect="light" >
                    <el-button size="mini" icon="el-icon-view" type="primary" @click="$emit('showmore',row.orderID)"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'OrderTable',
    props: {
        orderlist: Array,
        type:String
    },
    data() {
        return {};
    },
    computed: {
       orderID(){
           
         return  this.orderlist[0].id?'id':this.type+'PostID'
       }
    },
    filters:{
        
    },
    methods: {
        
    }
};
</script>

<style></style>
