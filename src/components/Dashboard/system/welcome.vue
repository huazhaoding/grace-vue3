<template>
  <el-card>
    <el-row>
      <el-col :span="18" :xs="24">
        <el-avatar :size="100" style="float: left; margin: 5px" :src="user.avatar" />
        <div style="float: left; margin: 5px">
          <h2>
            欢迎光临:<span style="margin-left: 10px; color: cadetblue">{{
              user.nickName
            }}</span>
          </h2>
          <el-text class="mx-1" type="info">最后登录时间<span style="margin-left: 5px; margin-right: 10px; color: royalblue">
              {{ parseTime(user.loginDate) }} </span>最后登录IP
            <span style="margin-left: 5px; color: royalblue">
              {{ user.loginIp }}</span></el-text>
        </div>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-row>
          <el-col :span="8" style="text-align: center;">
            <h6>地址</h6>
            <el-tooltip effect="dark" content="后端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-admin" type="success" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" content="前端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-vue3" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <h6>地址</h6>
            <el-tooltip effect="dark" content="后端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-admin" type="success" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" content="前端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-vue3" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <h6>地址</h6>
            <el-tooltip effect="dark" content="后端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-admin" type="success" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" content="前端地址" placement="top-start">
              <el-link href="https://gitee.com/Getawy/zg-vue3" underline="never"><svg class="icon"
                  style="width: 25px;height: 25px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504">
                  <path
                    d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z"
                    p-id="1505"></path>
                </svg></el-link>
            </el-tooltip>
          </el-col>



        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import useUserStore from "@/store/modules/user";
const user = useUserStore().loginUser;
</script>
