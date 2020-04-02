<template>
    <el-table border stripe :data="orderlist">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="orderID"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="用户编号" prop="userID"></el-table-column>
        <el-table-column label="联系方式" prop="contact"></el-table-column>
        <el-table-column label="类型"
            ><template v-slot="{ row }">
                <span>{{ Type(row.type) }}</span>
            </template></el-table-column
        >
        <el-table-column label="创建时间" prop="ge_time"></el-table-column>
        <el-table-column label="操作" width="180px">
            <template v-slot="{ row }">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="deleteFun(row.id)"
                    size="mini"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'OrderTable',
    props: {
        orderlist: Array
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        Type(type) {
            switch (type) {
                case 'lostFound':
                    return '失物招领';
                case 'help':
                    return '帮帮贴';
                case 'partTime':
                    return '兼职';
                case 'second':
                    return '二手';
            }
        },
        async deleteFun(id) {
            const result = await this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(error => error);

        if(result==='cancel')
        {
            this.$message.info('操作取消');
        }
        else{
            this.$message.success('订单成功删除');
            
        }
        }
    }
};
</script>

<style></style>
