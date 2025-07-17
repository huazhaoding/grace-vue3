<template>
   <div class="zg-attr-edit">
                  <el-form-item v-for="(item, key) in activeDataProperty.attr" :label="item.label" :key="key">
                    <el-input v-model="item.value" :placeholder="item.placeholder" v-if="item.type === 'input'" />
                    <el-switch v-model="item.value" v-else-if="item.type === 'switch'" />
                    <el-radio-group @change="handleRadioChange" v-model="item.value" v-else-if="item.type === 'radio'">
                      <el-radio v-for="(radio, index) in item.options" :key="index" :value="radio.value">{{ radio.label
                        }}</el-radio>
                    </el-radio-group>
                    <el-input-number v-model="item.value" v-else-if="item.type === 'number'" />
                    <el-color-picker v-model="item.value" v-else-if="item.type === 'color'" />
                    <el-slider v-model="item.value" v-else-if="item.type === 'slider'" :min="item.min" :max="item.max"
                      style="padding-left: 12px; padding-right: 12px" />
                    <el-input-tag v-model="item.value" v-else-if="item.type === 'tag'" />
                    <el-input v-else-if="item.type === 'icon'" v-model="item.value">
                      <template #append>
                        <el-button icon="Pointer" @click="openIconsDialog(key)">
                          选择
                        </el-button>
                      </template>
                    </el-input>
                    <el-popover placement="left" :width="400" trigger="click" v-else-if="
                      item.type === 'object' &&
                      activeDataProperty.tag === 'el-col'
                    ">
                      <template #reference>
                        <el-button style="width: 100%">{{ key }}</el-button>
                      </template>
                      <el-form-item v-for="(value, key) in item.value" :label="key" :key="key">
                        <el-slider v-model="item.value[key]" :min="0" :max="24" />
                      </el-form-item>
                      {{ item.value.span }}-{{ item.value.offset }}-{{
                        item.value.pull
                      }}-{{ item.value.push }}
                    </el-popover>
                  </el-form-item>
   </div>
<icons-dialog v-model="iconsVisible" :current="currentIconModel ? activeDataProperty.attr[currentIconModel] : null
    " @select="setIcon" />
</template>

<script setup> 
import IconsDialog from "./IconsDialog";
const iconsVisible= ref(false);
const currentIconModel = ref(null);
const props = defineProps({
  activeDataProperty: {
    type: Object,
    required: true,
    default: undefined,
  }
});

function handleRadioChange(value) {
  // 模板切换
  if (
    props.activeDataProperty.template &&
    typeof value === "string" &&
    value.indexOf("el-") > -1
  ) {
    props.activeDataProperty.slots.default.slotOptions = [];
    props.activeDataProperty.activeTemplate = value;
  }
}

function openIconsDialog(model) {
  iconsVisible.value = true;
  currentIconModel.value = model;
}

function setIcon(val) {
  if (props.activeDataProperty.attr[currentIconModel.value]) {
    props.activeDataProperty.attr[currentIconModel.value].value = val;
  }
}


</script>