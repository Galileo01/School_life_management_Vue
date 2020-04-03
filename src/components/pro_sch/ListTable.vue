<template>
  <el-table :data="datalist" stripe border>
     <el-table-column type="index"></el-table-column>
     <el-table-column prop="id" label="ID"></el-table-column>
     <el-table-column prop="name" :label="typeText+'名称'"></el-table-column>
     <el-table-column prop="proID" label="所属省份ID" v-if="type==='school'"></el-table-column>
     <el-table-column label="操作">
         <template v-slot="{row}">
             <el-button size="mini" icon="el-icon-edit" type="primary" @click="$emit('edit',row.id)"></el-button>
             <el-button icon="el-icon-delete" size="mini" type="danger" @click="$emit('remove',row.id)"></el-button>
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
        }
    },
}
</script>

<style>

</style>