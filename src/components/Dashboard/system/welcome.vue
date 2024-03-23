<template>
  <el-card>
    <el-row>
      <el-col :span="16" :xs="24">
        <el-avatar
          :size="100"
          style="float: left; margin: 5px"
          :src="user.avatar"
        />
        <div style="float: left; margin: 5px">
          <h2>
            欢迎光临:<span style="margin-left: 10px; color: cadetblue">{{
              user.nickName
            }}</span>
          </h2>
          <el-text class="mx-1" type="info"
            >最后登录时间<span
              style="margin-left: 5px; margin-right: 10px; color: royalblue"
            >
              {{ parseTime(user.loginDate) }} </span
            >最后登录IP
            <span style="margin-left: 5px; color: royalblue">
              {{ user.loginIp }}</span
            ></el-text
          >
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import useUserStore from "@/store/modules/user";
const user = useUserStore().loginUser;
</script>

<style></style>
