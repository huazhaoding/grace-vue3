<template>
  <div class="app-container">
  <el-row :gutter="20" class="da-box">
      <el-col :span="24" class="da-item">
         <welcome></welcome>
      </el-col>
      <el-col :span="12" class="da-item">
         <record></record>
      </el-col>
  </el-row>
</div>
</template>

<script setup>
import welcome from "@/components/Dashboard/system/welcome";
import record from "@/components/Dashboard/cms/record";
</script>

<style>
.da-box .da-item{
margin-top: 5px;
margin-bottom: 5px;


}
</style>