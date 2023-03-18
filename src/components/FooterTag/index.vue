<template>
    <div v-html="proxy.$sysConfig.footer" class="el-footer-box">

    </div>
</template>

<script setup>
const { proxy } = getCurrentInstance();
</script>

<style lang='scss' scoped>
.el-footer-box {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>