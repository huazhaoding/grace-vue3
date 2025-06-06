<template>
  <div class="app-container">
    <el-form :model="formData" ref="configRef" :rules="rules" label-position="right" label-width="100px">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane name="sysWeb" label="站点设置">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标题" prop="sys.common.title">
                <el-input v-model="formData['sys.common.title']" type="text" placeholder="请输入标题" clearable></el-input>
              </el-form-item>
              <el-form-item label="LOGO" prop="sys.common.logo">
                <image-upload v-model="formData['sys.common.logo']" :limit="1" />
              </el-form-item>
              <el-form-item label="ICO" prop="sys.common.ico">
                <image-upload v-model="formData['sys.common.ico']" :limit="1" />
              </el-form-item>
              <el-form-item label="描述" prop="sys.common.description">
                <el-input v-model="formData['sys.common.description']" type="textarea" placeholder="请输描述"
                  :rows="2"></el-input>
              </el-form-item>
              <el-form-item prop="sys.common.description.keywords">
              <template #label>
                <span>
                  <el-tooltip content="关键词限制1-8个字符" placement="top">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </el-tooltip>
                  关键词
                </span>
              </template>
              <keys-tag v-model="formData['sys.common.keywords']" :limit="5" :min-length="1" :max-length="8" />
            </el-form-item>
              <el-form-item label="底部" prop="sys.common.footer">
                <el-input v-model="formData['sys.common.footer']" type="textarea" :rows="4" placeholder="请输入底部代码" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="sysLogin" label="登录设置">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="背景" prop="sys.login.back">
                <image-upload v-model="formData['sys.login.back']" :limit="1" />
              </el-form-item>
              <el-form-item label="介绍" prop="sys.login.info">
                <el-input v-model="formData['sys.login.info']" type="textarea" :rows="4" placeholder="请输入介绍代码" />
              </el-form-item>
              <el-form-item label="公告开关" prop="sys.login.msg">
                <el-radio-group v-model="formData['sys.login.msg']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="sysUser" label="用户设置">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="验证开关" prop="sys.account.captchaEnabled">
                <el-radio-group v-model="formData['sys.account.captchaEnabled']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用户注册" prop="sys.account.registerUser">
                <el-radio-group v-model="formData['sys.account.registerUser']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="默认部门" prop="sys.account.defaultDept">
                <el-tree-select v-model="formData['sys.account.defaultDept']" :data="deptTreeList"
                  :props="{ value: 'id', label: 'label', children: 'children' }" value-key="id" placeholder="请选择归属部门"
                  check-strictly :render-after-expand="false" />
              </el-form-item>
              <el-form-item label="默认岗位">
                <el-select v-model="formData['sys.account.defaultPostIds']" multiple placeholder="请选择岗位">
                  <el-option v-for="item in postList" :key="item.postId" :label="item.postName"
                    :value="String(item.postId)" :disabled="item.status == 1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="默认角色" prop="sys.account.defaultRoleIds">
                <el-select v-model="formData['sys.account.defaultRoleIds']" multiple placeholder="请选择角色">
                  <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                    :value="String(item.roleId)" :disabled="item.status == 1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="初始密码" prop="sys.user.initPassword">
                <el-input v-model="formData['sys.user.initPassword']" type="input" :rows="4" placeholder="请输入默认密码" />
              </el-form-item>
              <el-form-item label="密码更新" prop="sys.account.passwordValidateDays">
                <el-radio-group v-model="formData['sys.account.passwordValidateDays']">
                  <el-radio v-for="dict in sys_true_false" :key="dict.value" :label="dict.value == 'true'">{{ dict.label
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="修改策略" prop="sys.account.initPasswordModify">
                <el-input v-model="formData['sys.account.initPasswordModify']" type="text" clearable></el-input>
              </el-form-item>
              <el-form-item label="更新周期" prop="sys.account.passwordValidateDays">
                <el-input v-model="formData['sys.account.passwordValidateDays']" type="text" clearable></el-input>
              </el-form-item>
              <el-form-item label="IP黑名单" prop="sys.login.blackIPList">
                <keys-tag v-model="formData['sys.login.blackIPList']" :limit="100" :min-length="7" :max-length="16" />

              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-button type="primary" @click="submitConfigForm" v-hasPermi="['system:setting:config']">确 定</el-button>
  </div>
</template>

<script setup name="sysConfig">
import { updateConfig, selectOptions } from "@/api/system/setting";
import KeysTag from "@/components/KeysTag";
const { proxy } = getCurrentInstance();
const { sys_true_false } = proxy.useDict("sys_true_false");
const activeTab = ref("sysWeb");
const data = reactive({
  deptTreeList: [],
  roleList: [],
  postList: [],
  formData: {},
  rules: {},
});
const { formData, rules, deptTreeList, roleList, postList } = toRefs(data);
proxy.getConfigValueMap("sysConfig").then((response) => {
  formData.value = response.data;
});
/** 提交按钮 */
function submitConfigForm() {
  updateConfig(formData.value).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
  });
}

// 数据初始化
function initData() {
  selectOptions().then((response) => {
    deptTreeList.value = response.deptTreeList;
    roleList.value = response.roleList;
    postList.value = response.postList;
  });
}
initData();
</script>
