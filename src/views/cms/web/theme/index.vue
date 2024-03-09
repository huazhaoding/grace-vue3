<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="UploadFilled"
          v-hasPermi="['cms:theme:add']"
          @click="openUploadDialog"
          >安装主题</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          class="upload-demo"
          type="primary"
          plain
          icon="EditPen"
          v-hasPermi="['cms:theme:edit']"
          @click="themeEditLink"
          >编辑主题</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Refresh"
          v-hasPermi="['cms:theme:reFlash']"
          >刷新列表</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Discount"
          v-hasPermi="['cms:theme:back']"
          >备份管理</el-button
        >
      </el-col>
      <el-table :data="themeList">
        <el-table-column label="站点名" align="center" prop="webName" />
        <el-table-column label="主题名" align="center" prop="themeName" />
        <el-table-column label="创建者" align="center" prop="createBy" />
        <el-table-column label="主题作者" align="center" prop="themeAuthor" />
        <el-table-column
          label="上传时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="主题介绍" align="center" prop="themeInfo" /> -->
        <el-table-column label="主题状态" align="center" prop="themeEnabled">
          <template #default="scope">
            <dict-tag
              :options="cms_theme_enabled"
              :dictSort="true"
              :value="scope.row.themeEnabled"
            />
          </template>
        </el-table-column>
        <el-table-column label="更新地址" align="center" prop="themeUpdate" />
        <!-- <el-table-column label="联系方式" align="center" prop="themeTouch" /> -->
        <el-table-column
          label="主题版本号"
          align="center"
          prop="themeVersion"
        />
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-tooltip content="类别配置" placement="top">
              <el-button
                link
                type="primary"
                icon="Discount"
                @click="handleCategory(scope.row)"
                v-hasPermi="['theme:category:config']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="站点配置" placement="top">
              <el-button
                link
                type="primary"
                icon="Setting"
                @click="handleSetting(scope.row)"
                v-hasPermi="['cms:theme:edit']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="主题配置" placement="top">
              <el-button
                link
                type="primary"
                icon="Operation"
                @click="handleTheme(scope.row)"
                v-hasPermi="['cms:theme:config']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除站点" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['cms:theme:remove']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--上传主题对话框 -->
    <el-dialog
      title="添加主题"
      v-model="openDialog"
      width="500px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item label="选择文件">
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            name="themeFile"
            :limit="1"
            :data="uploadParam"
            :action="uploadUrl"
            :headers="headers"
            :on-change="uploadChange"
            :on-remove="uploadRemove"
            :on-success="successThemeUpload"
            :on-error="errorThemeUpload"
            :before-upload="beforeThemeUpload"
          >
            <el-button type="primary" plain icon="UploadFilled"></el-button>
            <template #tip>
              <div>请上传后缀为.zip的压缩文件</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="覆盖上传">
          <el-radio-group v-model="uploadParam.cover">
            <el-radio
              v-for="dict in sys_true_false"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button v-if="isChoose" type="primary" @click="uploadTheme"
            >上传</el-button
          >
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 主题个性化配置 -->
    <theme-config
      v-model="openThemeDialog"
      :configGroup="configGroup"
      :updateConfigUrl="updateConfigUrl"
      :configForm="configForm"
    ></theme-config>
  </div>
</template>
<script setup name="theme">
import { getToken } from "@/utils/auth"; // 自己存储token的文件
import themeConfig from "@/components/FormConfig";
import { listTheme, delTheme, getThemeConfigForm } from "@/api/cms/theme";
const { proxy } = getCurrentInstance();
const router = useRouter();
const data = reactive({
  //附带参数
  uploadParam: {
    cover: "false",
    coverConfig: "false",
    webName: null,
  },
});
const isChoose = ref(false);
const configGroup = ref(undefined);
const updateConfigUrl = ref(undefined);
const configForm = ref(undefined);
const { uploadParam } = toRefs(data);

const { sys_true_false, cms_theme_enabled } = proxy.useDict(
  "sys_true_false",
  "cms_theme_enabled"
);
const uploadUrl = ref(
  import.meta.env.VITE_APP_BASE_API + "/cms/theme/uploadTheme"
);
const openDialog = ref(false);
const openThemeDialog = ref(false);
const headers = ref({ Authorization: "Bearer " + getToken() });
const route = useRoute();
const themeList = ref([]);
/** 查询主题列表 */
function getList() {
  if (route.params && route.params.webName) {
    uploadParam.value.webName = route.params.webName;
    listTheme({ webName: route.params.webName }).then((response) => {
      themeList.value = response.rows;
    });
  }
}

//主题弹窗
function openUploadDialog() {
  isChoose.value = false;
  openDialog.value = true;
}

// 主题设置Link
function handleSetting(row) {
  router.push({
    path: "/cms/web/theme/themeConfig/" + row.webName + "/" + row.themeName,
  });
}

function themeEditLink(){
  router.push({
    path: "/cms/web/theme/themeEdit/" + route.params.webName ,
  });
  
}

// 主题个性配置弹窗
function handleTheme(row) {
  configGroup.value = row.webName + "_" + row.themeName;
  // 表单更新地址
  updateConfigUrl.value = "cms/theme/updateConfig/" + configGroup.value;
  getThemeConfigForm(row.webName, row.themeName).then((response) => {
    configForm.value = response.data;
    openThemeDialog.value = true;
  });
}

function handleCategory(row) {
  router.push({
    path: "/cms/web/theme/category/" + row.webName + "/" + row.themeName,
  });
}

// 取消按钮
function cancel() {
  uploadParam.value.cover = "false";
  uploadParam.value.coverConfig = "false";
  openDialog.value = false;
  proxy.$refs["uploadRef"].clearFiles();
}

function handleDelete(row) {
  delTheme(row.webName, row.themeName).then((response) => {
    proxy.$modal.msgSuccess("删除成功");
    open.value = false;
    getList();
  });
}

function beforeThemeUpload(file) {
  let fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
  let fileName = file.name.slice(0, file.name.lastIndexOf("_"));
  if (fileExtension !== "zip") {
    proxy.$message.error(`请上传后缀为.zip的压缩文件!`);
    proxy.$refs["uploadRef"].clearFiles();
    isChoose.value = false;
    return false;
  } else if (fileName != route.params.webName) {
    proxy.$message.error(`请修改文件名前缀为:` + route.params.webName+",与主题名以_分割(站点名_主题名)");
    proxy.$refs["uploadRef"].clearFiles();
    isChoose.value = false;
    return false;
  } else {
    return true;
  }
}
function errorThemeUpload(res) {

  proxy.$message.error(res.msg);
  isChoose.value = false;
}

function successThemeUpload(res) {
  proxy.$refs["uploadRef"].clearFiles();
  setTimeout(() => {
    isChoose.value = false;
  }, 200);
  
  if (res.code === 500) {
    proxy.$message.error(res.msg);
  } else {
    openDialog.value = false;
    proxy.$message.success(res.msg);
    getList();
  }
 
}

function uploadChange(file, files) {
  isChoose.value =true; 
}

function uploadRemove(file, files) {
  isChoose.value = false;
  return true;
}

function uploadTheme() {
  proxy.$refs["uploadRef"].submit();
}

getList();
</script>
