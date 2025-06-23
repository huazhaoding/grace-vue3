<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" stretch class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="包围属性" name="hedge" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <el-icon>
          <Link />
        </el-icon>
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="currentTab === 'field' && showField" size="default" label-width="90px" label-position="top">
          <el-form-item v-if="formItemAttr.changeTag" label="组件类型">
            <el-select v-model="formItemAttr.tagIcon" placeholder="请选择组件类型" :style="{ width: '100%' }"
              @change="tagChange">
              <el-option-group v-for="group in tagList" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.label" :label="item.label" :value="item.tagIcon">
                  <svg-icon class="node-icon" :icon-class="item.tagIcon" style="margin-right: 10px;" />
                  <span> {{ item.label }}</span>
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item v-if="formItemAttr.vModel !== undefined" label="字段名">
            <el-input v-model="formItemAttr.vModel" placeholder="请输入字段名（v-model）" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.componentName !== undefined" label="组件名">
            {{ formItemAttr.componentName }}
          </el-form-item>
          <el-form-item v-if="formItemAttr.label !== undefined" label="标题">
            <el-input v-model="formItemAttr.label" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.placeholder !== undefined" label="占位提示">
            <el-input v-model="formItemAttr.placeholder" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['start-placeholder'] !== undefined" label="开始占位">
            <el-input v-model="formItemAttr['start-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['end-placeholder'] !== undefined" label="结束占位">
            <el-input v-model="formItemAttr['end-placeholder']" placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.span !== undefined" label="表单栅格">
            <el-slider v-model="formItemAttr.span" :max="24" :min="1" :marks="{ 12: '' }" @change="spanChange" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.layout === 'rowFormItem'" label="栅格间隔">
            <el-input-number v-model="formItemAttr.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.justify !== undefined" label="水平排列">
            <el-select v-model="formItemAttr.justify" placeholder="请选择水平排列" :style="{ width: '100%' }">
              <el-option v-for="(item, index) in justifyOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formItemAttr.align !== undefined" label="垂直排列">
            <el-radio-group v-model="formItemAttr.align">
              <el-radio-button value="top" />
              <el-radio-button value="middle" />
              <el-radio-button value="bottom" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemAttr.labelWidth !== undefined" label="标签宽度">
            <el-input v-model.number="formItemAttr.labelWidth" type="number" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.style && formItemAttr.style.width !== undefined" label="组件宽度">
            <el-input v-model="formItemAttr.style.width" placeholder="请输入组件宽度" clearable />
          </el-form-item>
          <el-form-item v-if="formItemAttr.vModel !== undefined" label="默认值">
            <el-input v-model="formItemAttr.defaultValue" placeholder="请输入默认值" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-checkbox-group'" label="至少应选">
            <el-input-number :value="formItemAttr.min" :min="0" placeholder="至少应选"
              @input="$set(formItemAttr, 'min', $event ? $event : undefined)" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-checkbox-group'" label="最多可选">
            <el-input-number :value="formItemAttr.max" :min="0" placeholder="最多可选"
              @input="$set(formItemAttr, 'max', $event ? $event : undefined)" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.prepend !== undefined" label="前缀">
            <el-input v-model="formItemAttr.prepend" placeholder="请输入前缀" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.append !== undefined" label="后缀">
            <el-input v-model="formItemAttr.append" placeholder="请输入后缀" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['prefix-icon'] !== undefined" label="前图标">
            <el-input v-model="formItemAttr['prefix-icon']" placeholder="请输入前图标名称">
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('prefix-icon')">
                  选择
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="formItemAttr['suffix-icon'] !== undefined" label="后图标">
            <el-input v-model="formItemAttr['suffix-icon']" placeholder="请输入后图标名称">
              <template #append>
                <el-button icon="Pointer" @click="openIconsDialog('suffix-icon')">
                  选择
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-cascader'" label="选项分隔符">
            <el-input v-model="formItemAttr.separator" placeholder="请输入选项分隔符" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.autosize !== undefined" label="最小行数">
            <el-input-number v-model="formItemAttr.autosize.minRows" :min="1" placeholder="最小行数" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.autosize !== undefined" label="最大行数">
            <el-input-number v-model="formItemAttr.autosize.maxRows" :min="1" placeholder="最大行数" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.min !== undefined" label="最小值">
            <el-input-number v-model="formItemAttr.min" placeholder="最小值" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.max !== undefined" label="最大值">
            <el-input-number v-model="formItemAttr.max" placeholder="最大值" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.step !== undefined" label="步长">
            <el-input-number v-model="formItemAttr.step" placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-input-number'" label="精度">
            <el-input-number v-model="formItemAttr.precision" :min="0" placeholder="精度" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-input-number'" label="按钮位置">
            <el-radio-group v-model="formItemAttr['controls-position']">
              <el-radio-button value="">
                默认
              </el-radio-button>
              <el-radio-button value="right">
                右侧
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemAttr.maxlength !== undefined" label="最多输入">
            <el-input v-model="formItemAttr.maxlength" placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="formItemAttr['active-text'] !== undefined" label="开启提示">
            <el-input v-model="formItemAttr['active-text']" placeholder="请输入开启提示" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['inactive-text'] !== undefined" label="关闭提示">
            <el-input v-model="formItemAttr['inactive-text']" placeholder="请输入关闭提示" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['active-value'] !== undefined" label="开启值">
            <el-input :value="setDefaultValue(formItemAttr['active-value'])" placeholder="请输入开启值"
              @input="onSwitchValueInput($event, 'active-value')" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['inactive-value'] !== undefined" label="关闭值">
            <el-input :value="setDefaultValue(formItemAttr['inactive-value'])" placeholder="请输入关闭值"
              @input="onSwitchValueInput($event, 'inactive-value')" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.type !== undefined && 'el-date-picker' === formItemAttr.tag" label="时间类型">
            <el-select v-model="formItemAttr.type" placeholder="请选择时间类型" :style="{ width: '100%' }"
              @change="dateTypeChange">
              <el-option v-for="(item, index) in dateOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formItemAttr.name !== undefined" label="文件字段名">
            <el-input v-model="formItemAttr.name" placeholder="请输入上传文件字段名" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.accept !== undefined" label="文件类型">
            <el-select v-model="formItemAttr.accept" placeholder="请选择文件类型" :style="{ width: '100%' }" clearable>
              <el-option label="图片" value="image/*" />
              <el-option label="视频" value="video/*" />
              <el-option label="音频" value="audio/*" />
              <el-option label="excel" value=".xls,.xlsx" />
              <el-option label="word" value=".doc,.docx" />
              <el-option label="pdf" value=".pdf" />
              <el-option label="txt" value=".txt" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formItemAttr.fileSize !== undefined" label="文件大小">
            <el-input v-model.number="formItemAttr.fileSize" placeholder="请输入文件大小">
              <el-select slot="append" v-model="formItemAttr.sizeUnit" :style="{ width: '66px' }">
                <el-option label="KB" value="KB" />
                <el-option label="MB" value="MB" />
                <el-option label="GB" value="GB" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item v-if="formItemAttr.action !== undefined" label="上传地址">
            <el-input v-model="formItemAttr.action" placeholder="请输入上传地址" clearable />
          </el-form-item>
          <el-form-item v-if="formItemAttr['list-type'] !== undefined" label="列表类型">
            <el-radio-group v-model="formItemAttr['list-type']" size="small">
              <el-radio-button value="text">
                text
              </el-radio-button>
              <el-radio-button value="picture">
                picture
              </el-radio-button>
              <el-radio-button value="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemAttr.buttonText !== undefined" v-show="'picture-card' !== formItemAttr['list-type']"
            label="按钮文字">
            <el-input v-model="formItemAttr.buttonText" placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['range-separator'] !== undefined" label="分隔符">
            <el-input v-model="formItemAttr['range-separator']" placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['picker-options'] !== undefined" label="时间段">
            <el-input v-model="formItemAttr['picker-options'].selectableRange" placeholder="请输入时间段" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.format !== undefined" label="时间格式">
            <el-input :value="formItemAttr.format" placeholder="请输入时间格式" @input="setTimeValue($event)" />
          </el-form-item>
          <template v-if="['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(formItemAttr.tag) > -1">
            <el-divider>选项</el-divider>
            <draggable :list="formItemAttr.options" :animation="340" group="selectItem" handle=".option-drag"
              item-key="label">
              <template #item="{ element, index }">
                <div :key="index" class="select-item">
                  <div class="select-line-icon option-drag">
                    <i class="el-icon-s-operation" />
                  </div>
                  <el-input v-model="element.label" placeholder="选项名" size="small" />
                  <el-input placeholder="选项值" size="small" :value="element.value"
                    @input="setOptionValue(element, $event)" />
                  <div class="close-btn select-line-icon" @click="formItemAttr.options.splice(index, 1)">
                    <el-icon>
                      <Remove />
                    </el-icon>
                  </div>
                </div>
              </template>
            </draggable>
            <div>
              <el-button icon="CirclePlus" style="margin-left: 8px; margin-top: 10px;" text bg type="primary"
                @click="addSelectItem">
                添加选项
              </el-button>
            </div>
            <el-divider />
          </template>

          <template v-if="['el-cascader'].indexOf(formItemAttr.tag) > -1">
            <el-divider>选项</el-divider>
            <el-form-item label="数据类型">
              <el-radio-group v-model="formItemAttr.dataType" size="small">
                <el-radio-button value="dynamic">
                  动态数据
                </el-radio-button>
                <el-radio-button value="static">
                  静态数据
                </el-radio-button>
              </el-radio-group>
            </el-form-item>

            <template v-if="formItemAttr.dataType === 'dynamic'">
              <el-form-item label="标签键名">
                <el-input v-model="formItemAttr.labelKey" placeholder="请输入标签键名" />
              </el-form-item>
              <el-form-item label="值键名">
                <el-input v-model="formItemAttr.valueKey" placeholder="请输入值键名" />
              </el-form-item>
              <el-form-item label="子级键名">
                <el-input v-model="formItemAttr.childrenKey" placeholder="请输入子级键名" />
              </el-form-item>
            </template>

            <el-tree v-if="formItemAttr.dataType === 'static'" draggable :data="formItemAttr.options" node-key="id"
              :expand-on-click-node="false" :render-content="renderContent" />
            <div v-if="formItemAttr.dataType === 'static'">
              <el-button icon="CirclePlus" style="margin-left: 0; margin-top: 10px;" type="primary" text bg
                @click="addTreeItem">
                添加父级
              </el-button>
            </div>
            <el-divider />
          </template>

          <el-form-item v-if="formItemAttr.optionType !== undefined" label="选项样式">
            <el-radio-group v-model="formItemAttr.optionType">
              <el-radio-button value="default">
                默认
              </el-radio-button>
              <el-radio-button value="button">
                按钮
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemAttr['active-color'] !== undefined" label="开启颜色">
            <el-color-picker v-model="formItemAttr['active-color']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['inactive-color'] !== undefined" label="关闭颜色">
            <el-color-picker v-model="formItemAttr['inactive-color']" />
          </el-form-item>

          <el-form-item v-if="formItemAttr['allow-half'] !== undefined" label="允许半选">
            <el-switch v-model="formItemAttr['allow-half']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['show-text'] !== undefined" label="辅助文字">
            <el-switch v-model="formItemAttr['show-text']" @change="rateTextChange" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['show-score'] !== undefined" label="显示分数">
            <el-switch v-model="formItemAttr['show-score']" @change="rateScoreChange" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['show-stops'] !== undefined" label="显示间断点">
            <el-switch v-model="formItemAttr['show-stops']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.range !== undefined" label="范围选择">
            <el-switch v-model="formItemAttr.range" @change="rangeChange" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.border !== undefined && formItemAttr.optionType === 'default'" label="是否带边框">
            <el-switch v-model="formItemAttr.border" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-color-picker'" label="颜色格式">
            <el-select v-model="formItemAttr['color-format']" placeholder="请选择颜色格式" :style="{ width: '100%' }"
              @change="colorFormatChange">
              <el-option v-for="(item, index) in colorFormatOptions" :key="index" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="formItemAttr.size !== undefined &&
            (formItemAttr.optionType === 'button' ||
              formItemAttr.border ||
              formItemAttr.tag === 'el-color-picker')" label="选项尺寸">
            <el-radio-group v-model="formItemAttr.size">
              <el-radio-button value="large">
                较大
              </el-radio-button>
              <el-radio-button value="default">
                默认
              </el-radio-button>
              <el-radio-button value="small">
                较小
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemAttr['show-word-limit'] !== undefined" label="输入统计">
            <el-switch v-model="formItemAttr['show-word-limit']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-input-number'" label="严格步数">
            <el-switch v-model="formItemAttr['step-strictly']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-cascader'" label="是否多选">
            <el-switch v-model="formItemAttr.multiple" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-cascader'" label="展示全路径">
            <el-switch v-model="formItemAttr['show-all-levels']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-cascader'" label="可否筛选">
            <el-switch v-model="formItemAttr.filterable" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.clearable !== undefined" label="能否清空">
            <el-switch v-model="formItemAttr.clearable" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.showTip !== undefined" label="显示提示">
            <el-switch v-model="formItemAttr.showTip" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.multiple !== undefined" label="多选文件">
            <el-switch v-model="formItemAttr.multiple" />
          </el-form-item>
          <el-form-item v-if="formItemAttr['auto-upload'] !== undefined" label="自动上传">
            <el-switch v-model="formItemAttr['auto-upload']" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.readonly !== undefined" label="是否只读">
            <el-switch v-model="formItemAttr.readonly" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.disabled !== undefined" label="是否禁用">
            <el-switch v-model="formItemAttr.disabled" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-select'" label="是否可搜索">
            <el-switch v-model="formItemAttr.filterable" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.tag === 'el-select'" label="是否多选">
            <el-switch v-model="formItemAttr.multiple" @change="multipleChange" />
          </el-form-item>
          <el-form-item v-if="formItemAttr.required !== undefined" label="是否必填">
            <el-switch v-model="formItemAttr.required" />
          </el-form-item>

          <template v-if="formItemAttr.layoutTree">
            <el-divider>布局结构树</el-divider>
            <el-tree :data="[formItemAttr]" :props="layoutTreeProps" node-key="renderKey" default-expand-all draggable>
              <template #default="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon" :icon-class="data.tagIcon" style="margin-right: 5px;" />
                  {{ node.label }}
                </span>
              </template>
            </el-tree>
          </template>

          <template v-if="formItemAttr.layout === 'colFormItem'">
            <el-divider>正则校验</el-divider>
            <div v-for="(item, index) in formItemAttr.regList" :key="index" class="reg-item">
              <span class="close-btn" @click="formItemAttr.regList.splice(index, 1)">
                <el-icon>
                  <Close />
                </el-icon>
              </span>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern" placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model="item.message" placeholder="请输入错误提示" />
              </el-form-item>
            </div>
            <div>
              <el-button icon="CirclePlus" style="margin-left: 0; margin-top: 10px;" type="primary" text bg
                @click="addReg">
                添加规则
              </el-button>
            </div>
          </template>
        </el-form>

        <!-- 包围属性 -->
        <!-- export const defaultItemHedge= {
    model: {}, // 表单数据  
    rules: {}, // 表单验证规则
    inline: false, // 是否行内表单
    labelPosition: "right", // 标签位置：left / right / top
    labelWidth: "100px", // 标签宽度
    labelSuffix: ":", // 标签后缀
    hideRequiredAsterisk: false, // 是否隐藏必填字段的红色星号
    showMessage: true, // 是否显示校验错误信息
    inlineMessage: false, // 是否以行内形式展示校验信息
    statusIcon: false, // 是否在输入框中显示校验结果反馈图标
    validateOnRuleChange: true, // 是否在 rules 属性改变时重新触发校验
    size: "default", // 尺寸：large / default / small
    disabled: false, // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
    scrollToError: false, // 当校验失败时，是否滚动到第一个错误表单项
    scrollToErrorOffset: 0, // 滚动到错误表单项时的偏移量
    requireAsteriskPosition: "left", // 必填星号的位置：left / right
  } -->
        <el-form v-show="currentTab === 'hedge'" label-width="90px" label-position="top">
          <el-form-item label="标签名称" v-if="formItemHedge.label !== undefined">
            <el-input v-model="formItemHedge.label" placeholder="请输入标签名称" />
          </el-form-item>
          <el-form-item label="标签宽度" v-if="formItemHedge.labelWidth !== undefined">
            <el-input v-model="formItemHedge.labelWidth" placeholder="请输入标签宽度" />
          </el-form-item>
          <el-form-item label="表单尺寸" v-if="formItemHedge.size !== undefined">
            <el-radio-group v-model="formItemHedge.size">
              <el-radio-button value="large" label="大" />
              <el-radio-button value="default" label="中" />
              <el-radio-button value="small" label="小" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签位置" v-if="formItemHedge.labelPosition !== undefined">
            <el-radio-group   v-model="formItemHedge.labelPosition">
              <el-radio-button value="" label="默认" />
              <el-radio-button value="left" label="左边" />
              <el-radio-button value="right" label="右边" />
              <el-radio-button value="top" label="上边" />
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formItemHedge.span !== undefined" label="表单栅格">
            <el-slider v-model="formItemHedge.span" :max="24" :min="1" :marks="{ 12: '' }" @change="spanChange" />
          </el-form-item>
          <el-form-item label="是否必填" v-if="formItemHedge.required !== undefined">
            <el-switch v-model="formItemHedge.required" />
          </el-form-item>
          <el-form-item label="错误提示" v-if="formItemHedge.error !== undefined">
             <el-input v-model="formItemHedge.error" placeholder="请输入错误提示" />
          </el-form-item>
          <el-form-item label="显示校验信息" v-if="formItemHedge.showMessage !== undefined">
          <el-switch v-model="formItemHedge.showMessage" />
          </el-form-item>
          <el-form-item label="是否行内显示校验信息" v-if="formItemHedge.inlineMessage !== undefined">
            <el-switch v-model="formItemHedge.inlineMessage" />
          </el-form-item> 
          <!--resetFields prop 必填
              for,prop 均对应表单属性
              validateStatus 表单验证状态 此处不可选  这是动态的
          <el-form-item label="绑定属性" v-if="formItemHedge.prop !== undefined">
            <el-input v-model="formItemHedge.prop" placeholder="请输入绑定属性" />
          </el-form-item>
           <el-form-item label="绑定元素" v-if="formItemHedge.for !== undefined">
             <el-input v-model="formItemHedge.for" />
          </el-form-item> 
           <el-form-item label="校验状态" v-if="formItemHedge.validateStatus !== undefined">
               <el-radio-group v-model="formItemHedge.validateStatus"> 
                <el-radio label="success"></el-radio>
                <el-radio label="error"></el-radio>
                <el-radio label=""></el-radio>
                <el-radio label="validating"></el-radio>
               </el-radio-group>
          </el-form-item> 
          -->

        </el-form>

        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" label-width="90px" label-position="top">
          <el-form-item label="表单名">
            <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
          </el-form-item>
          <el-form-item label="表单模型">
            <el-input v-model="formConf.formModel" placeholder="请输入数据模型" />
          </el-form-item>
          <el-form-item label="校验模型">
            <el-input v-model="formConf.formRules" placeholder="请输入校验模型" />
          </el-form-item>
          <el-form-item label="表单尺寸">
            <el-radio-group v-model="formConf.size">
              <el-radio-button value="large" label="大" />
              <el-radio-button value="default" label="中" />
              <el-radio-button value="small" label="小" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签对齐">
            <el-radio-group v-model="formConf.labelPosition">
              <el-radio-button value="left" label="左对齐" />
              <el-radio-button value="right" label="右对齐" />
              <el-radio-button value="top" label="顶部对齐" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number v-model="formConf.labelWidth" placeholder="标签宽度" />
          </el-form-item>
          <el-form-item label="栅格间隔">
            <el-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="formConf.disabled" />
          </el-form-item>
          <el-form-item label="表单按钮">
            <el-switch v-model="formConf.formBtns" />
          </el-form-item>
          <el-form-item label="显示未选中组件边框">
            <el-switch v-model="formConf.unFocusedComponentBorder" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <!-- <icons-dialog v-model="iconsVisible" :current="formItemAttr[currentIconModel]" @select="setIcon" /> -->
    <treeNode-dialog v-model="dialogVisible" @commit="addNode" />

  </div>
</template>

<script setup>
import draggable from "vuedraggable/dist/vuedraggable.common";
import { isNumberStr } from '@/utils/index'
import IconsDialog from './IconsDialog'
import TreeNodeDialog from './TreeNodeDialog'
import {
  inputComponents,
  selectComponents
} from '@/utils/generator/config'

const { proxy } = getCurrentInstance()
const dateTimeFormat = {
  date: 'YYYY-MM-DD',
  week: 'YYYY 第 ww 周',
  month: 'YYYY-MM',
  year: 'YYYY',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss'
}
const props = defineProps({
  showField: Boolean,
  activeDataProperty: Object,
  formConf: Object
});
const formItemHedge = ref([]);

const formItemAttr = ref([]);


watch(() => props.activeDataProperty, (val) => {
  formItemAttr.value=val.formItemAttr;
  formItemHedge.value=val.formItemHedge
})
watch(() => formItemAttr, (val) => {
  console.log(val);
  emit('formItemChange', {
    formItemAttr: val
    , formItemHedge: formItemHedge.value
  })
})

watch(() => formItemHedge, (val) => {
  console.log(val);
  emit('formItemChange', {
    formItemAttr: formItemAttr.value
    , formItemHedge: val
  })
})

const data = reactive({
  currentTab: 'field',
  currentNode: null,
  dialogVisible: false,
  iconsVisible: false,
  currentIconModel: null,
  dateTypeOptions: [
    {
      label: '日(date)',
      value: 'date'
    },
    {
      label: '周(week)',
      value: 'week'
    },
    {
      label: '月(month)',
      value: 'month'
    },
    {
      label: '年(year)',
      value: 'year'
    },
    {
      label: '日期时间(datetime)',
      value: 'datetime'
    }
  ],
  dateRangeTypeOptions: [
    {
      label: '日期范围(daterange)',
      value: 'daterange'
    },
    {
      label: '月范围(monthrange)',
      value: 'monthrange'
    },
    {
      label: '日期时间范围(datetimerange)',
      value: 'datetimerange'
    }
  ],
  colorFormatOptions: [
    {
      label: 'hex',
      value: 'hex'
    },
    {
      label: 'rgb',
      value: 'rgb'
    },
    {
      label: 'rgba',
      value: 'rgba'
    },
    {
      label: 'hsv',
      value: 'hsv'
    },
    {
      label: 'hsl',
      value: 'hsl'
    }
  ],
  justifyOptions: [
    {
      label: 'start',
      value: 'start'
    },
    {
      label: 'end',
      value: 'end'
    },
    {
      label: 'center',
      value: 'center'
    },
    {
      label: 'space-around',
      value: 'space-around'
    },
    {
      label: 'space-between',
      value: 'space-between'
    }
  ],
  layoutTreeProps: {
    label(data, node) {
      return data.componentName || `${data.label}: ${data.vModel}`
    }
  }
})

const { currentTab, currentNode, dialogVisible, iconsVisible, currentIconModel, dateTypeOptions, dateRangeTypeOptions, colorFormatOptions, justifyOptions, layoutTreeProps } = toRefs(data)

const documentLink = computed(() => formItemAttr.value?.document
  || 'https://element-plus.org/zh-CN/guide/installation')

const dateOptions = computed(() => {
  if (
    formItemAttr.value.type !== undefined
    && formItemAttr.value.tag === 'el-date-picker'
  ) {
    if (formItemAttr.value['start-placeholder'] === undefined) {
      return dateTypeOptions.value
    }
    return dateRangeTypeOptions.value
  }
  return []
})

const tagList = ref([
  {
    label: '输入型组件',
    options: inputComponents
  },
  {
    label: '选择型组件',
    options: selectComponents
  }
])

const emit = defineEmits(['tag-change', 'formItemChange'])


function addReg() {
  formItemAttr.value.regList.push({
    pattern: '',
    message: ''
  })
}
function addSelectItem() {
  formItemAttr.value.options.push({
    label: '',
    value: ''
  })
}

function addTreeItem() {
  ++proxy.idGlobal
  dialogVisible.value = true
  currentNode.value = formItemAttr.value.options
}

function renderContent(h, { node, data, store }) {
  return h('div', {
    class: "custom-tree-node"
  }, [
    h('span', node.label),
    h('span', {
      class: "node-operation"
    }, [
      h(resolveComponent('el-link'), {
        type: "primary",
        icon: "Plus",
        underline: false,
        onClick: () => {
          append(data)

        }
      }),
      h(resolveComponent('el-link'), {
        type: "danger",
        icon: "Delete",
        underline: false,
        style: "margin-left: 5px;",
        onClick: () => {
          remove(node, data)
        }
      })
    ])
  ])
  // return (
  //   <div class="custom-tree-node">
  //     <span>{node.label}</span>
  //     <span class="node-operation">
  //       <el-link type="primary" on-click={() => append(data)} icon="Plus" underline={false}></el-link>
  //       <el-link style="margin-left: 5px;" type="danger" on-click={() => remove(node, data)} icon="Delete" underline={false}></el-link>
  //     </span>
  //   </div>
  // )
}
function append(data) {
  if (!data.children) {
    // this.$set(data, 'children', [])
    data.children = []
  }
  dialogVisible.value = true
  currentNode.value = data.children
}
function remove(node, data) {
  const { parent } = node
  const children = parent.data.children || parent.data
  const index = children.findIndex(d => d.id === data.id)
  children.splice(index, 1)
}
function addNode(data) {
  currentNode.value.push(data)
}

function setOptionValue(item, val) {
  item.value = isNumberStr(val) ? +val : val
}
function setDefaultValue(val) {
  if (Array.isArray(val)) {
    return val.join(',')
  }
  if (['string', 'number'].indexOf(val) > -1) {
    return val
  }
  if (typeof val === 'boolean') {
    return `${val}`
  }
  return val
}

function onDefaultValueInput(str) {

  if (Array.isArray(formItemAttr.value.defaultValue)) {
    // 数组
    formItemAttr.value.defaultValue = str.split(',').map(val => (isNumberStr(val) ? +val : val))
  } else if (['true', 'false'].indexOf(str) > -1) {
    // 布尔
    formItemAttr.value.defaultValue = JSON.parse(str)
  } else {
    // 字符串和数字
    formItemAttr.value.defaultValue = isNumberStr(str) ? +str : str
  }
  console.log('defaultValue', formItemAttr.value.defaultValue)
}

function onSwitchValueInput(val, name) {
  if (['true', 'false'].indexOf(val) > -1) {
    formItemAttr.value[name] = JSON.parse(val)
  } else {
    formItemAttr.value[name] = isNumberStr(val) ? +val : val
  }
}

function setTimeValue(val, type) {
  const valueFormat = type === 'week' ? dateTimeFormat.date : val
  formItemAttr.value.defaultValue = null
  formItemAttr.value['value-format'] = valueFormat
  formItemAttr.value.format = val
}

function spanChange(val) {
  props.formConf.span = val
}

function multipleChange(val) {
  formItemAttr.value.defaultValue = val ? [] : ''
}

function dateTypeChange(val) {
  setTimeValue(dateTimeFormat[val], val)
}

function rangeChange(val) {
  formItemAttr.value.defaultValue = val ? [formItemAttr.value.min, formItemAttr.value.max] : formItemAttr.value.min
}

function rateTextChange(val) {
  if (val) formItemAttr.value['show-score'] = false
}

function rateScoreChange(val) {
  if (val) formItemAttr.value['show-text'] = false
}

function colorFormatChange(val) {
  formItemAttr.value.defaultValue = null
  formItemAttr.value['show-alpha'] = val.indexOf('a') > -1
  formItemAttr.value.renderKey = +new Date() // 更新renderKey,重新渲染该组件
}

function openIconsDialog(model) {
  iconsVisible.value = true
  currentIconModel.value = model
}

function setIcon(val) {
  formItemAttr.value[currentIconModel.value] = val
}

function tagChange(tagIcon) {
  let target = inputComponents.find(item => item.tagIcon === tagIcon)
  if (!target) target = selectComponents.find(item => item.tagIcon === tagIcon)
  emit('tag-change', target)
}
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;

  &:deep() {
    .el-tabs__header {
      margin: 0;
    }

    .el-input-group__append .el-button {
      display: inline-flex;
    }
  }

  .field-box {
    position: relative;
    height: calc(100vh - 50px - 40px - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }

  .el-scrollbar {
    height: 100%;

    &:deep() {
      .el-scrollbar__view {
        padding: 30px 20px;
      }

    }
  }
}

.reg-item {
  padding: 12px 6px;
  background: var(--el-border-color-extra-light);
  position: relative;
  border-radius: 4px;

  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, .2);
    border-radius: 50%;
    color: #fff;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;
  }
}


.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;

  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }

  & .el-input+.el-input {
    margin-left: 4px;
  }
}

.select-item+.select-item {
  margin-top: 4px;
}

.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}

.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}

.option-drag {
  cursor: move;
}

.time-range {
  .el-date-editor {
    width: 227px;
  }

  :deep() {
    .el-icon-time {
      display: none;
    }
  }
}

.document-link {
  position: absolute;
  display: flex;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
}

.node-label {
  font-size: 14px;
}

.node-icon {
  color: #bebfc3;
}
</style>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>