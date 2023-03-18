<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="链接名" prop="linkName">
        <el-input
          v-model="queryParams.linkName"
          placeholder="请输入链接名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="visible">
        <el-select v-model="queryParams.visible" placeholder="状态" clearable>
          <el-option
            v-for="dict in sys_show_hide"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="linkType">
        <el-select v-model="queryParams.linkType" placeholder="类型" clearable>
          <el-option
            v-for="dict in cms_link_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分组名" prop="groupName">
        <el-select
          v-model="queryParams.groupName"
          placeholder="配置组别"
          clearable
        >
          <el-option
            v-for="group in restaurants"
            :key="group.value"
            :label="group.value"
            :value="group.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建人" prop="updateBy">
        <el-input
          v-model="queryParams.updateBy"
          placeholder="请输入创建人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          placeholder="请输入排序"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['link:link:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['link:link:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-dropdown @command="handleVisibleCommand" :disabled="multiple">
          <el-button type="primary" :disabled="multiple">
            标签状态<el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in sys_show_hide" :command="item">{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
      <el-col :span="1.5">
        <el-dropdown @command="handleOpenTypeCommand" :disabled="multiple">
          <el-button type="primary" :disabled="multiple">
            打开方式<el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in cms_link_open" :command="item">{{item.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['link:link:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
        :columns="columns"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="linkList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="链接id" align="center" prop="linkId" />
      <el-table-column label="分组名" align="center" prop="groupName" />
      <el-table-column label="链接地址" align="center" prop="linkUrl" />
      <el-table-column label="链接名" align="center" prop="linkName" />
      <el-table-column label="链接LOGO" align="center" prop="linkFavicon" />
      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="sys_show_hide" :value="scope.row.visible" />
        </template> </el-table-column
      >>
      <el-table-column
        label="打开方式"
        align="center"
        prop="openType"
        v-if="columns[0].visible"
      >
        <template #default="scope">
          <dict-tag :options="cms_link_open" :value="scope.row.openType" />
        </template>
      </el-table-column>
      <el-table-column
        label="排序"
        align="center"
        prop="orderNum"
        v-if="columns[1].visible"
      />
      <el-table-column
        label="介绍"
        align="center"
        prop="linkSuggest"
        v-if="columns[2].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
        v-if="columns[4].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人"
        align="center"
        prop="createBy"
        v-if="columns[5].visible"
      />
      <el-table-column
        label="修改时间"
        align="center"
        prop="updateTime"
        width="180"
        v-if="columns[6].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改人"
        align="center"
        prop="updateBy"
        v-if="columns[7].visible"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
                type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['link:link:edit']"
            >修改
          </el-button>
          <el-button
            link
                type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['link:link:remove']"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改友情链接对话框 -->
    <el-dialog :title="title" v-model="open" width="550px" append-to-body>
      <el-form ref="linkRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="分组名" prop="groupName">
          <el-autocomplete
            v-model="form.groupName"
            :fetch-suggestions="querySearchGroupName"
            clearable
            class="inline-input w-50"
            placeholder="请输入分组名"
          />
        </el-form-item>
        <el-form-item label="类型" prop="linkType">
          <el-radio-group v-model="form.linkType">
            <el-radio
              v-for="dict in cms_link_type"
              :key="dict.value"
              :label="Number(dict.value)"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="链接名" prop="linkName">
          <el-input v-model="form.linkName" placeholder="请输入链接名" />
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="form.linkUrl" placeholder="请输入链接地址" />
        </el-form-item>

        <el-form-item label="链接LOGO" prop="linkFavicon">
          <image-upload
            v-model="form.linkFavicon"
            :limit="1"
          />
          <el-input v-model="form.linkFavicon" placeholder="请输入链接LOGO" />
        </el-form-item>
        <el-form-item label="链接介绍" prop="linkSuggest">
          <el-input v-model="form.linkSuggest" placeholder="请输入链接介绍" />
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="form.orderNum"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态" prop="visible">
          <el-radio-group v-model="form.visible">
            <el-radio
              v-for="dict in sys_show_hide"
              :key="dict.value"
              :label="Number(dict.value)"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Link">
import {
  listLink,
  getLink,
  delLink,
  addLink,
  updateLink,
  updateLinkVisible,
  updateLinkOpenType,
  listLinkGroupNames,
} from "@/api/cms/link";

const { proxy } = getCurrentInstance();
const { sys_show_hide, cms_link_open, cms_link_type } = proxy.useDict(
  "sys_show_hide",
  "cms_link_open",
  "cms_link_type"
);

const linkList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const logoList = ref([]);

// 列显隐信息
const columns = ref([
  { key: 0, label: `打开`, visible: false },
  { key: 1, label: `排序`, visible: false },
  { key: 2, label: `介绍`, visible: false },
  { key: 3, label: `备注`, visible: false },
  { key: 4, label: `创建时间`, visible: false },
  { key: 5, label: `创建人`, visible: false },
  { key: 6, label: `修改时间`, visible: false },
  { key: 7, label: `修改人`, visible: false }
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    linkName: null,
    visible: null,
    updateBy: null,
    orderNum: null,
    linkType: null,
    groupName: null,
  },
  rules: {
    linkUrl: [{ required: true, message: "链接地址不能为空", trigger: "blur" }],
    linkName: [{ required: true, message: "链接名不能为空", trigger: "blur" }],
    visible: [{ required: true, message: "状态不能为空", trigger: "blur" }],
    linkType: [{ required: true, message: "类型不能为空", trigger: "blur" }],
    openType: [
      { required: true, message: "打开方式不能为空", trigger: "blur" },
    ],
    groupName: [{ required: true, message: "分组名不能为空", trigger: "blur" }],
  },
});

const { queryParams, form, rules } = toRefs(data);
const restaurants = ref([]);
const querySearchGroupName = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;
  // call callback function to return suggestions
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

onMounted(() => {
  listLinkGroupNames().then((response) => {
    response.data.forEach((g) => {
      if (g.length > 0) {
        restaurants.value.push({ value: g });
      }
    });
  });
});

/** 查询友情链接列表 */
function getList() {
  loading.value = true;
  listLink(queryParams.value).then((response) => {
    linkList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    linkId: null,
    linkUrl: null,
    linkName: null,
    linkSuggest: null,
    linkFavicon: null,
    visible: null,
    remark: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    createBy: null,
    orderNum: null,
    groupName: null,
    openType: null,
  };
  proxy.resetForm("linkRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.linkId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加友情链接";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _linkId = row.linkId || ids.value;
  getLink(_linkId).then((response) => {
    form.value = response.data;
    if (form.value.linkFavicon) {
      logoList.value = [{ url: form.value.linkFavicon, name: "linkFavicon" }];
    }
    open.value = true;
    title.value = "修改友情链接";
  });
}

function handleVisibleCommand(item){
  const _linkIds = row.linkId || ids.value;
  proxy.$modal
    .confirm('是否确认修改为"' +  _linkIds + '"的数据的状态为：'+item.label+'吗?')
    .then(function () {
      return updateLinkVisible(item.value, _linkIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("修改成功");
    })
    .catch(() => {});
}

function handleOpenTypeCommand(item){
  const  _linkIds = row.linkId || ids.value;
  proxy.$modal
    .confirm('是否确认修改为"' +  _linkIds + '"的数据的打开方式为：'+item.label+'吗?')
    .then(function () {
      return updateLinkOpenType(item.value, _linkIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("修改成功");
    })
    .catch(() => {});
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["linkRef"].validate((valid) => {
    if (valid) {
      if (form.value.linkId != null) {
        updateLink(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addLink(form.value).then((response) => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _linkIds = row.linkId || ids.value;
  proxy.$modal
    .confirm('是否确认删除友情链接编号为"' + _linkIds + '"的数据项？')
    .then(function () {
      return delLink(_linkIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

getList();
</script>
