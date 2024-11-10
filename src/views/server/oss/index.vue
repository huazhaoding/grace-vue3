<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="选择储存" prop="ossType">
        <el-select
          v-model="queryParams.ossType"
          placeholder="储存选择"
          clearable
        >
          <el-option
            v-for="dict in sys_server_oss_list"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件类型" prop="fileType">
        <el-select
          v-model="queryParams.fileType"
          placeholder="文件类型"
          clearable
        >
          <el-option
            v-for="dict in sys_server_oss_types"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="queryParams.dateRange"
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
      <el-col :span="1.5">
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          :accept="upload.accept"
          :action="upload.url"
          :headers="upload.headers"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
        >
          <el-button
            type="primary"
            icon="UploadFilled"
            v-hasPermi="['server:oss:add']"
            >文件上传</el-button
          >
        </el-upload>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Edit"
          @click="configUpdate"
          v-hasPermi="['server:oss:config']"
          >储存配置</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['server:oss:remove']"
          >批量删除</el-button
        >
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="ossList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="文件名" align="center" prop="fileName" />
      <el-table-column label="文件大小" align="center" prop="size" />
      <el-table-column label="唯一路径" align="center" prop="fk">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            v-if="'image' === scope.row.fileType"
            :src="getThumbnail(scope.row.fk,baseUrl+scope.row.domain,scope.row.ossType)"
           preview-teleported
            :preview-src-list="[
              getImgUrl(scope.row.fk,baseUrl+scope.row.domain,scope.row.ossType)
            ]"
          />
          <el-image
            style="width: 100px; height: 100px"
            v-if="'image' != scope.row.fileType"
            :src="'/src/assets/fit/' + scope.row.fileType+'.png'"
          />
        </template>
      </el-table-column>
      <el-table-column label="文件类型" align="center" prop="fileType">
        <template #default="scope">
          <dict-tag
            :options="sys_server_oss_types"
            :value="scope.row.fileType"
          />
        </template>
      </el-table-column>
      <el-table-column label="域名" align="center" prop="domain" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="储存类型" align="center" prop="ossType">
        <template #default="scope">
          <dict-tag :options="sys_server_oss_list" :value="scope.row.ossType" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            link
                type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['server:oss:remove']"
            >删除</el-button
          >
          <el-button
            link
                type="primary"
            icon="Download"
            @click="handleDownload(scope.row)"
            v-hasPermi="['server:oss:download']"
            >下载</el-button
          >
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

    <!-- 储存配置 -->
    <el-dialog
      :title="configTitle"
      v-model="configOpen"
      width="600px"
      append-to-body
    >
      <el-form ref="ossConfigRef" :model="configForm" label-width="80px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="通用配置" name="commonConfig">
            <el-form-item label="储存" prop="oly.oss.used">
              <el-radio-group v-model="configForm['oly.oss.used']">
                <el-radio
                  v-for="dict in sys_server_oss_list"
                  :key="dict.value"
                  :value="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="支持类型" prop="oly.oss.support.type">
              <el-select
                v-model="configForm['oly.oss.support.type']"
                placeholder="请选择"
                multiple
                collapse-tags
                style="width: 240px"
              >
                <el-option
                  v-for="item in sys_server_oss_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="中文转换" prop="oly.oss.zh.py">
              <el-radio-group v-model="configForm['oly.oss.zh.py']">
                <el-radio
                  v-for="dict in sys_true_false"
                  :key="dict.value"
                  :label="dict.value=='true'"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
              <el-form-item prop="oly.oss.max.length">
                <template #label>
                  <span>
                     <el-tooltip content="原文件名允许最大字符" placement="top">
                        <el-icon><question-filled /></el-icon>
                     </el-tooltip>
                     文件名
                  </span>
               </template>
                <el-input-number
                  v-model="configForm['oly.oss.max.length']"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
      
            <el-space fill>
              <el-alert type="info" show-icon :closable="false">
                <p>注意文件大小单位为KB</p>
              </el-alert>
              <el-form-item label="图片大小" prop="oly.oss.image.maxSize">
                <el-input-number
                  v-model="configForm['oly.oss.image.maxSize']"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="音频大小" prop="oly.oss.music.maxSize">
                <el-input-number
                  v-model="configForm['oly.oss.music.maxSize']"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="视频大小" prop="oly.oss.video.maxSize">
                <el-input-number
                  v-model="configForm['oly.oss.video.maxSize']"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="文档大小" prop="oly.oss.document.maxSize">
                <el-input-number
                  v-model="configForm['oly.oss.document.maxSize']"
                  controls-position="right"
                  :min="0"
                />              
              </el-form-item>
              <el-form-item label="压缩大小" prop="oly.oss.compress.maxSize">
                <el-input-number
                  v-model="configForm['oly.oss.compress.maxSize']"
                  controls-position="right"
                  :min="0"
                />
              </el-form-item>
            </el-space>
          </el-tab-pane>
          <el-tab-pane label="本地配置" name="nativeConfig">
            <el-form-item label="本地域名" prop="oly.oss.native.domain">
              <el-input
                v-model="configForm['oly.oss.native.domain']"
                placeholder="请输入域名参数"
              />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitConfigForm"  v-hasPermi="['server:oss:config']">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Oss">
import { getToken } from "@/utils/auth";
import { listOss,  delOss, updateConfig } from "@/api/server/oss";
const { proxy } = getCurrentInstance();
const baseUrl=import.meta.env.VITE_APP_BASE_API;
const { sys_server_oss_types, sys_server_oss_list, sys_true_false } =
  proxy.useDict(
    "sys_server_oss_types",
    "sys_server_oss_list",
    "sys_true_false"
  );

const ossList = ref([]);
const configOpen = ref(false);
const configTitle = ref("");
const activeTab = ref("commonConfig");
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const upload = reactive({
  // 接受类型
  accept: "*",
  // 是否禁用上传
  isUploading: false,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: baseUrl + "/server/oss/upload",
});

const data = reactive({
  configForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fileName: null,
    size: null,
    fileType: null,
    ossType: null,
    dateRange: "",
  },
  rules: {
    ossUsed: [{ required: true, message: "用途不能为空", trigger: "blur" }],
  },
});

const { queryParams, configForm, rules } = toRefs(data);

/** 查询文件存储列表 */
function getList() {
  loading.value = true;
  listOss(queryParams.value).then((response) => {
    ossList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

function getThumbnail(key, domain, ossType) {
  if ("native" === ossType) {
   const sp=key.split("/");
   sp[sp.length-1]="thumbnail_"+sp[sp.length-1];
   return domain+key;
  } else if ("qiniu" === ossType) {
    return domain+key;
  }
}

function getImgUrl(key, domain, ossType) {
  if ("native" === ossType) {
   return domain+key;
  } else if ("qiniu" === ossType) {
    return domain+key;
  }
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
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 修改配置 */
function configUpdate() {
  proxy.getConfigValueMap("ossConfig").then((response) => {
    configForm.value = response.data;
    configForm.value["oly.oss.support.type"] =
      configForm.value["oly.oss.support.type"].split(",");
    configOpen.value = true;
    configTitle.value = "存储配置";
  });
}

/** 取消按钮 */
function cancel() {
  configOpen.value = false;
}

/** 提交按钮 */
function submitConfigForm() {
  configForm.value["oly.oss.support.type"] =
    configForm.value["oly.oss.support.type"].join(",");
  updateConfig(configForm.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
    configOpen.value = false;
  });
}

/**数据下载 */
function  handleDownload(row) {
  proxy.downloadFile(row.domain+row.fk, {
  },row.fileName);
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal
    .confirm('是否确认删除文件存储key为"' + _ids + '"的数据项？')
    .then(function () {
      return delOss(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {
      proxy.$modal.msgError("删除失败");
    });
}


/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};
/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  if (response.code != 200) {
    proxy.$modal.msgError(response.msg);
  } else {
    proxy.$modal.msgSuccess("上传成功");
    getList();
  }
  upload.isUploading = false;
};

getList();
</script>
