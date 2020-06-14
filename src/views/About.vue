<template>
    <div class="about">
        <BreadNav :texts="['其他', '关于']" />
        <el-card>
            <el-col :span="4">微信小程序码</el-col>
            <el-col :span="4"
                    ><img
                        src="~assets/img/bcode.jpg"
                        alt=""
                /></el-col>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'About'
};
</script>

<style scoped lang="less">
.about {
    a {
        text-decoration: none;
        color: rgb(64, 158, 255);
    }
    .el-row {
        margin-bottom: 20px;
    }
     a:nth-of-type(2){
            margin-left: 10px;
    }
}
</style>
