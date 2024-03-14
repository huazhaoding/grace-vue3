<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="类目名字" prop="categoryName">
        <el-input
          v-model="queryParams.categoryName"
          placeholder="请输入类目名字"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入创建人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="24" style="margin-bottom: 13px">
        <el-button-group class="ml-4">
          <el-button
            type="primary"
            :class="{ chooseTab: queryParams.nodeTypes == '2,3' }"
            @click="chooseNode('2,3')"
            >分类</el-button
          >
          <el-button
            type="primary"
            :class="{ chooseTab: queryParams.nodeTypes == '4,5' }"
            @click="chooseNode('4,5')"
            >标签</el-button
          >
          <el-button
            type="primary"
            :class="{ chooseTab: queryParams.nodeTypes == '6,7' }"
            @click="chooseNode('6,7')"
            >轮播</el-button
          >
          <el-button
            type="primary"
            :class="{ chooseTab: queryParams.nodeTypes == '8,9' }"
            @click="chooseNode('8,9')"
            >推荐</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>

    <div class="card-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 左侧全部 -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <div class="header-title">全部</div>
                <el-input v-model="states.allSearchValue" placeholder="名称">
                  <template #suffix>
                    <el-icon @click="searchNode('left')"><Search /></el-icon>
                  </template>
                </el-input>
              </div>
            </template>
            <div>
              <el-tree
                ref="treeLeftRef"
                :data="states.treeData"
                default-expand-all
                show-checkbox
                :props="states.treeProps"
                node-key="id"
                :check-strictly="true"
                :filter-node-method="filterNode"
                :default-checked-keys="states.defaultChecked"
                @check="handleCheckChange"
              />
            </div> </el-card
        ></el-col>
        <el-col :span="6">
          <!-- 右侧已选择的 -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <div class="header-title">
                  已选：{{ states.hasSelectionSonList.length }}
                </div>
                <el-input v-model="states.hasSearchValue" placeholder="名称">
                  <template #suffix>
                    <el-icon @click="searchNode('right')"><Search /></el-icon>
                  </template>
                </el-input>
              </div>
            </template>
            <div>
              <el-tree
                ref="treeRightRef"
                :data="states.hasSelectionList"
                default-expand-all
                :props="states.treeProps"
                node-key="id"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
              >
                <template #default="{ node, data }">
                  <div class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-icon @click="removeNode(node, data)"
                        ><Close
                      /></el-icon>
                    </span>
                  </div>
                </template>
              </el-tree>
            </div> </el-card
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup name="themeCategory">
import {
  categoryTree,
  listCategoryIds,
  addCategoryTheme,
  removeCategoryTheme,
} from "@/api/cms/category";

const { proxy } = getCurrentInstance();
const route = useRoute();
const showSearch = ref(true);
const loading = ref(true);
const dateRange = ref([]);

//左侧树的标识
const treeLeftRef = ref(null);
//右侧树的标识
const treeRightRef = ref(null);

const states = reactive({
  //树配置
  treeProps: {
    value: "id",
    label: "label",
    children: "children",
    // disabled: getCategoryDisabled,
  },
  //全部搜索
  allSearchValue: undefined,
  //已选搜索
  hasSearchValue: undefined,
  //保存已经勾选的数据，包括父节点和子节点
  hasSelectionList: [],
  //保存已经勾选的数据，只保存子节点
  hasSelectionSonList: [],
  //保存不同分支树的节点
  treeIds: [],
  //保存左侧树的数据
  treeData: [],
  //默认勾选数据
  defaultChecked: [],
  //表单查询
  queryParams: {
    categoryId: null,
    categoryName: null,
    themeName: route.params.webName + "_" + route.params.themeName,
    orderNum: null,
    nodeTypes: "2,3",
  },
});

//树勾选处理，获取所有勾选的子集
const handleCheckChange = (da,node)=>{
const isChecked = node.checkedKeys.includes(da.id);
if(isChecked){
  addCategoryTheme(states.queryParams.themeName,da.id).then((response) => {
    proxy.$modal.msgSuccess("添加成功");
    updateRight();
  });
}
else{
  removeCategoryTheme(states.queryParams.themeName,da.id).then((response) => {
    proxy.$modal.msgSuccess("移除成功");
    updateRight();
  });
}

};

function updateRight(){
  //获取勾选的子集数据，不包括父级
  states.hasSelectionSonList = treeLeftRef.value.getCheckedNodes(true);
  //获取选中的节点，包括父节点、子节点、半选中节点
  let data = treeLeftRef.value.getCheckedNodes(false, true);
  //为了防止数据里包含子节点数据，这里只取一级数据
  let data2 = data.map((e) => {
    return {
      id: e.id,
      label: e.label,
      parentId: e.parentId,
    };
  });
  // console.log(data2)
  //将组装的数据转成树形数据，再右侧显示
  states.hasSelectionList = proxy.handleTree(data2, "id", "parentId");

}

//查询用户
const searchNode = (type) => {
  if (type == "left") {
    //左侧树查询
    treeLeftRef.value.filter(states.allSearchValue);
  } else {
    //右侧树查询
    treeRightRef.value.filter(states.hasSearchValue);
  }
};

//树节点过滤
const filterNode = (value, data) => {
  if (!value) return true;
  return data.name.includes(value);
};

//移除节点
const removeNode = (node, data) => {
  // console.log(node, data)
  //取消左侧树的勾选
  treeLeftRef.value.setChecked(data, false, true);
  removeCategoryTheme(states.queryParams.themeName,data.id).then((response) => {
    proxy.$modal.msgSuccess("移除成功");
    updateRight();
  });
};

//清除数据
const clearData = () => {
  states.hasSelectionList = [];
  states.hasSelectionSonList = [];
  states.allSearchValue = undefined;
  states.hasSearchValue = undefined;
  states.treeIds = [];
  states.treeData = [];
  states.defaultChecked = [];
};

const { queryParams } = toRefs(states);

/** 查询类目列表 */
function getList() {
  loading.value = true;
  let lisQ= Object.assign({}, queryParams.value);
  lisQ.themeName=null;
  categoryTree(proxy.addDateRange(lisQ, dateRange.value)).then(
    (response) => {
      states.treeData = response.data;
      loading.value = false;
      getChecked();
    }
  );
}

// 获取已经关联
function getChecked() {
  listCategoryIds(queryParams.value).then((response) => {
    //默认勾选值
    states.defaultChecked = response.data;
    loading.value = false;
    //处理勾选
    setTimeout(function () {
      updateRight();
    }, 500); // 参数为要执行的函数和等待的时间（单位为毫秒）
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

function chooseNode(nodeTypes) {
  queryParams.value.nodeTypes = nodeTypes;
  getList();
}

getList();
</script>

<style scoped>
.chooseTab {
  background-color: rgb(1, 38, 41); /* 当isActive为true时应用该样式 */
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
