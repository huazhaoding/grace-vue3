import request from '@/utils/request'

// 查询主题列表
export function listTheme(query) {
  return request({
    url: '/cms/theme/list',
    method: 'get',
    params: query
  })
}

// 查询主题详细
export function getTheme(webName,themeName) {
  return request({
    url: '/cms/theme/getTheme/' + webName+'/'+themeName,
    method: 'get'
  })
}

// 新增主题
export function addTheme(data) {
  return request({
    url: '/cms/theme',
    method: 'post',
    data: data
  })
}

// 修改主题
export function updateTheme(data) {
  return request({
    url: '/cms/theme',
    method: 'put',
    data: data
  })
}

// 删除主题
export function delTheme(webName,themeName) {
  return request({
    url: '/cms/theme/remove/' + webName+'/'+themeName,
    method: 'delete'
  })
}

// 更新配置
export function updateConfig(webName,themeName,data) {
  return request({
    url: '/cms/theme/updateConfig/'+webName+"_"+themeName,
    method: 'post',
    data: data
  })
}

// 获取配置表单
export function getThemeConfigForm(webName,themeName) {
  return request({
    url: '/cms/theme/getThemeConfigForm/'+webName+"/"+themeName,
    method: 'get'
  })
}

// 获取主题树
export function getThemeTree(webName) {
  return request({
    url: '/cms/theme/getThemeTree/'+webName,
    method: 'get'
  })
}

// 获取主题文件内容
export function getThemeFileContent(webName,path) {
  return request({
    url: '/cms/theme/getThemeFileContent/'+webName+'?path='+path,
    method: 'get'
  })
}

// 更新配置
export function updateThemeFileContent(webName,data) {
  return request({
    url: '/cms/theme/updateThemeFileContent/'+webName,
    method: 'post',
    data: data
  })
}



// 同步主题
export function syncTheme(webName,data) {
  return request({
    url: '/cms/theme/syncTheme/'+webName,
    method: 'post',
    data: data
  })
}


// 获取主题名列表
export function listThemeNames(webName) {
  return request({
    url: '/cms/theme/listThemeNames/'+webName,
    method: 'get'
  })
}