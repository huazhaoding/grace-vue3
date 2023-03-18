<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="主题" prop="subject">
        <el-input
          v-model="queryParams.subject"
          placeholder="请输入主题"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人ID" prop="handler">
        <el-input
          v-model="queryParams.handler"
          placeholder="请输入处理人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="称呼" prop="userCall">
        <el-input
          v-model="queryParams.userCall"
          placeholder="请输入称呼"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈类型" prop="contactType">
        <el-select
          v-model="queryParams.contactType"
          placeholder="选择类型"
          clearable
        >
          <el-option
            v-for="dict in cms_contact_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="visible">
        <el-select
          v-model="queryParams.visible"
          placeholder="选择状态"
          clearable
        >
          <el-option
            v-for="dict in cms_contact_visible"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="处理时间" prop="handleTime">
        <el-date-picker
          clearable
          v-model="queryParams.handleTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择处理时间"
        >
        </el-date-picker>
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
          v-hasPermi="['cms:contact:add']"
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
          v-hasPermi="['cms:contact:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cms:contact:remove']"
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
      :data="contactList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="反馈ID" align="center" prop="contactId" />
      <el-table-column label="主题" align="center" prop="subject" />
      <el-table-column
        label="发布人"
        align="center"
        prop="createBy"
        v-if="columns[0].visible"
      />
      <el-table-column label="称呼" align="center" prop="userCall" />
      <el-table-column
        label="邮件"
        align="center"
        v-if="columns[1].visible"
        prop="email"
      />
      <el-table-column
        label="联系方式"
        align="center"
        v-if="columns[2].visible"
        prop="touch"
      />
      <el-table-column label="类型" align="center" prop="contactType">
        <template #default="scope">
          <dict-tag
            :options="cms_contact_type"
            :value="scope.row.contactType"
          />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="visible">
        <template #default="scope">
          <dict-tag :options="cms_contact_visible" :value="scope.row.visible" />
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理时间"
        align="center"
        prop="handleTime"
        width="180"
        v-if="columns[3].visible"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.handleTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理人"
        align="center"
        v-if="columns[4].visible"
        prop="handler"
      />
      <el-table-column
        label="备注"
        v-if="columns[5].visible"
        align="center"
        prop="remark"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button
              link
                type="primary"
              icon="Edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['cms:contact:edit']"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="查看" placement="top">
            <el-button
              link
                type="primary"
              icon="View"
              @click="contactView(scope.row)"
              v-hasPermi="['cms:contact:query']"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="处理" placement="top">
            <el-button
              link
                type="primary"
              icon="Operation"
              @click="handleContact(scope.row)"
              v-hasPermi="['cms:contact:hand']"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              link
                type="primary"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['cms:contact:remove']"
            >
            </el-button>
          </el-tooltip>
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

    <!-- 添加或修改反馈|建议对话框 -->
    <el-dialog :title="title" v-model="open" width="60%" append-to-body>
      <el-form ref="contactRef" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" >
            <el-form-item label="反馈类型" prop="contactType">
              <el-radio-group v-model="form.contactType">
                <el-radio :disabled="isHand"
                  v-for="dict in cms_contact_type"
                  :key="dict.value"
                  :label="Number(dict.value)"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="主题"  prop="subject">
              <el-input v-model="form.subject" :disabled="isHand" placeholder="请输入主题" />
            </el-form-item>
            <el-form-item label="称呼" prop="userCall">
              <el-input v-model="form.userCall" :disabled="isHand" placeholder="请输入称呼" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <vue3-tinymce v-model="form.content" :readOnly="isHand" />
            </el-form-item>
            <el-form-item label="邮件"  prop="email">
              <el-input v-model="form.email" :disabled="isHand" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="联系方式"  prop="touch">
              <el-input v-model="form.touch" :disabled="isHand" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
            v-hasPermi="['cms:contact:handle']"
            v-if="isHand"
          >
            <el-form-item label="结果" prop="handleResult">
              <vue3-tinymce v-model="form.handleResult"  />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                        :rows="6"
                        type="textarea"
                        placeholder="请输入备注"
                        v-model="form.remark"
              />
            </el-form-item>
            <el-form-item label="状态" prop="visible">
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in cms_contact_visible"
                  :key="dict.value"
                  :label="Number(dict.value)"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 反馈详情 -->
    <el-dialog
      title="反馈详情"
      v-model="detailOpen"
      width="700px"
      append-to-body
    >
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="类型：">
              <dict-tag :options="cms_contact_type" :value="form.contactType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主题：">{{ form.subject }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布人：">{{ form.createBy }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="称呼：">{{ form.userCall }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间：">{{
              parseTime(form.createTime)
            }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容："
              ><div v-html="form.content"></div
            ></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱：">{{
              form.email
            }}</el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item label="联系方式：">{{ form.touch }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态：">
              <dict-tag :options="cms_contact_visible" :value="form.visible" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理时间：">{{
              parseTime(form.handTime)
            }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理人：">{{ form.handler }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容："
              ><div v-html="form.handleResult"></div
            ></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">{{ form.remark }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="detailOpen = false">关 闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Contact">
import {
  listContact,
  getContact,
  delContact,
  addContact,
  updateContact,
} from "@/api/cms/contact";
import Vue3Tinymce from "@/components/Editor/TinymceEdit";
const { proxy } = getCurrentInstance();

const { cms_contact_type, cms_contact_visible } = proxy.useDict(
  "cms_contact_type",
  "cms_contact_visible"
);

// 列显隐信息
const columns = ref([
  { key: 0, label: `发布人`, visible: false },
  { key: 1, label: `邮件`, visible: false },
  { key: 2, label: `联系方式`, visible: false },
  { key: 3, label: `处理人`, visible: false },
  { key: 4, label: `处理时间`, visible: false },
  { key: 5, label: `备注`, visible: false },
]);

const contactList = ref([]);
const open = ref(false);
const detailOpen = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const isHand = ref(false);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    subject: null,
    content: null,
    handler: null,
    email: null,
    visible: null,
    contactType: null,
    handleResult: null,
    handleTime: null,
    userCall: null,
  },
  rules: {},
});

const { queryParams, form, rules } = toRefs(data);

/** 查询反馈|建议列表 */
function getList() {
  loading.value = true;
  listContact(queryParams.value).then((response) => {
    contactList.value = response.rows;
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
    contactId: null,
    subject: null,
    content: null,
    handler: null,
    email: null,
    touch: null,
    visible: null,
    createTime: null,
    contactType: null,
    handleResult: null,
    handleTime: null,
    createBy: null,
    remark: null,
    userCall: null,
  };
  proxy.resetForm("contactRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

// 同步内容
const contentInput = (params) => {
  form.value.content = params;
};

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.contactId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  isHand.value = false;
  title.value = "添加反馈";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  isHand.value = false;
  reset();
  const _contactId = row.contactId || ids.value;
  getContact(_contactId).then((response) => {
    form.value = response.data;
    open.value = true;
    title.value = "修改反馈";
  });
}

function contactView(row) {
  reset();
  const _contactId = row.contactId || ids.value;
  getContact(_contactId).then((response) => {
    form.value = response.data;
    detailOpen.value = true;
  });
}

/** 处理按钮操作 */
function handleContact(row) {
  isHand.value = true;
  reset();
  const _contactId = row.contactId || ids.value;
  getContact(_contactId).then((response) => {
    form.value = response.data;
    open.value = true;
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["contactRef"].validate((valid) => {
    if (valid) {
      if (form.value.contactId != null) {
        updateContact(form.value).then((response) => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addContact(form.value).then((response) => {
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
  const _contactIds = row.contactId || ids.value;
  proxy.$modal
    .confirm('是否确认删除反馈|建议编号为"' + _contactIds + '"的数据项？')
    .then(function () {
      return delContact(_contactIds);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "system/contact/export",
    {
      ...queryParams.value,
    },
    `contact_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
