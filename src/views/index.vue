<template>
   <div class="app-container">
      <el-row :gutter="20" class="da-box">
         <el-col :span="24" class="da-item">
            <welcome></welcome>
         </el-col>
         <el-col :span="24" class="da-item">
            <el-row :gutter="20">
               <el-col :span="8" :xs="24" class="da-item">
                  <el-card >
                     <template #header>
                        <div class="card-header">
                           <span>Card name</span>
                        </div>
                     </template>
                     <p  class="text item">内容</p>
                  </el-card>
               </el-col>
               <el-col :span="8" :xs="24" class="da-item">
                  <el-card shadow="never">
                     <el-row></el-row>

                  </el-card>
               </el-col>
               <el-col :span="8" :xs="24" class="da-item">
                  <el-card shadow="never">
                     <el-row></el-row>

                  </el-card>
               </el-col>
            </el-row>
         </el-col>
         <el-col :span="12" :xs="24" class="da-item">
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
.da-box .da-item {
   margin-top: 5px;
   margin-bottom: 5px;


}
</style>