<template>
  <el-form
    ref="userInfoRef"
    :model="userInfo"
    label-width="80px"
  >
    <el-form-item label="生日" prop="birthday">
      <el-date-picker
      v-model="userInfo.birthday"
      value-format="YYYY-MM-DD"
        type="date"
        placeholder="请输入出生年月"
      />
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <keys-tag
        v-model="userInfo.tags"
        :limit="8"
        :min-length="2"
        :max-length="5"
      />
    </el-form-item>
    <el-form-item label="爱好" prop="hobby">
      <keys-tag
        v-model="userInfo.hobby"
        :limit="8"
        :min-length="2"
        :max-length="5"
      />
    </el-form-item>
    <el-form-item label="介绍">
      <el-input
        v-model="userInfo.introduce"
        type="textarea"
        :rows="3"
        placeholder="请输入介绍"
      />
    </el-form-item>
    <el-form-item label="位置">
      <JsonTag labelName="所属" valueName="位置" v-model="userInfo.local" ></JsonTag>
    </el-form-item>
    <el-form-item label="社交">
      <JsonTag labelName="平台" valueName="地址" v-model="userInfo.contact"></JsonTag>
    </el-form-item>
    <el-form-item label="联系">
      <JsonTag labelName="方式" valueName="号码" v-model="userInfo.touch"></JsonTag>
    </el-form-item>
    <el-form-item label="其它">
      <JsonTag v-model="userInfo.shows"></JsonTag>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button type="danger" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { updateUserInfo } from "@/api/system/user";
import KeysTag from "@/components/KeysTag";
import JsonTag from "@/components/JsonTag";

const props = defineProps({
  userInfo: {
    type: Object,
    default: {}
  },
});

const { proxy } = getCurrentInstance();

/** 提交按钮 */
function submit() {
    updateUserInfo(props.userInfo).then((response) => {
       proxy.$modal.msgSuccess("修改成功");
      });
}
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
}
</script>
