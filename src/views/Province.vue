<template>
  <div class="province">
    <BreadNav :texts="['数据管理','省份管理']" />
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入省份"><el-button slot="append">搜索</el-button></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button>添加省份</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default { 
  name:"Province",
  methods:{
  
  },
  created(){
 
  }
}

</script>

<style>

</style>