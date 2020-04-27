<template>
  <el-table :data="datalist" stripe border size="mini" >
     <el-table-column type="index"></el-table-column>
     <el-table-column prop="provinceID" label="省份ID" ></el-table-column>
     <el-table-column prop="universityID" label="学校ID" v-if="type==='university'" ></el-table-column>
     <el-table-column prop="name" :label="typeText+'名称'" ></el-table-column>
     <el-table-column prop="proID" label="所属省份ID" v-if="type==='school'"></el-table-column>
     <el-table-column label="操作">
         <template v-slot="{row}">
             <el-button size="mini" icon="el-icon-edit" type="primary" @click="$emit('edit',row.name)"></el-button>
             <el-button icon="el-icon-delete" size="mini" type="danger" @click="$emit('remove',row.name)"></el-button>
         </template>
     </el-table-column>
  </el-table>
</template>

<script>
export default {
 name:"PASTable",
 props:{
     datalist:Array,
     type:String
 },
computed: {
        typeText() {
            if (this.type === 'province') return '省份';
            else return '学校';
        },
        itemID(){
            
        }
    },
}
</script>

<style scoped lang="less">


</style>