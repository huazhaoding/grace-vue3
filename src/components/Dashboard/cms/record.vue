<template>
  <el-card>
    <template #header>
      <div class="card-header" >
        <div class="flex gap-4 mb-4">
          <el-text class="mx-1" type="primary">访问趋势</el-text>
          <div style="margin-right:40px">
            <el-select
              style="width:220px;padding: 10px;"
              ref="themeSelectRef"
              v-model="queryParams.themeName"
              placeholder="请选择站点"
              clearable
            >
              <el-option-group
                v-for="(themes, key) of themeMapData"
                :key="key"
                :label="key"
              >
                <el-option
                  v-for="theme in themes"
                  :key="theme.webName + '_' + theme.themeName"
                  :label="theme.themeName"
                  :value="theme.mainCategoryId"
                />
              </el-option-group>
            </el-select>
            <el-date-picker
            style="margin-left:10px ;margin-right:5px ;width: 300px;"
              v-model="queryParams.dateRange"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-button style="margin: 10px;" type="primary" icon="Search">搜索</el-button>
          </div>  
        </div>
      </div>
    </template>
    <div class="el-table el-table--enable-row-hover el-table--medium">
      <div ref="record" style="height: 420px" >
      </div>
    </div>
    <template #footer>Footer content</template>
  </el-card>
</template>

<script setup>
import { themeMap } from "@/api/cms/article";
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const themeMapData = ref({});
const record=ref(null);
themeMap().then((response) => {
  themeMapData.value = response.data;

});
const queryParams = ref({
  themeName: "",
  dateRange: "",
});

onMounted(()=>{
  xx()
 		})

function  xx(){

    const recordIntance = echarts.init(record.value,"macarons");

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};

recordIntance.setOption(option);

}


</script>

<style>

</style>
