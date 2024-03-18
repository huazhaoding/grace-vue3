<template>
    <el-aside :width="w" v-show="w==maxWidth" class="aside-box">
      <slot></slot>
    </el-aside>
    <div class="btn-box">
          <el-icon
            class="btn"
            v-show="w==maxWidth"
            @click="w='0px'"
          >
            <CaretLeft />
          </el-icon>
          <el-icon
            class="btn"
            v-show="w!=maxWidth"
            @click="w =maxWidth"
          >
            <CaretRight />
          </el-icon>
    </div>
</template>

<script setup>
const props = defineProps({
    maxWidth: {
        type: String,
        default: "200px",
    },
});

const w=ref("0px");

//初始化数据
watch(
  () => props.maxWidth,
  (val) => {
    if (val) {
      w.value = props.maxWidth;
    }
  },
  { deep: true, immediate: true }
);





</script>


<style lang="scss" scoped>
.aside-box {
height: 100%;
background-color: white;
overflow: hidden;

}
.btn-box {
  margin-left: 10px;
  width: 16px;
  margin-top: 50vh;

  .btn {
    position: relative;
    right: 13px;
  }
}
</style>